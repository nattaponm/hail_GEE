/*
This program is designed for use in the assessment of the affected hail area based on composite classified hydrometeor classes in 1 hour. 
The hydrometeors product is derived from dual-polarization weather ground-based radar provided by the Thai Meteorological Department (TMD). 
Radar cappi at 2 km above MSL height is used as raster exported from developed Python codes.
We categorize the hydrometeors product into two classes: solid freezing and liquid classes.
If you require further information, 
please contact Dr. Nattapon Mahavik at Naresuan University, Thailand, via email: nattaponm@nu.ac.th
code link : https://code.earthengine.google.com/ce13b5ba25d59c3de18ae9d62b9f8072
*/

//0. filter geometry for Chiang Khong District 
var geometry = ee.Geometry.Point([100.404412, 20.258927]); //เชียงของ
var roi = ee.FeatureCollection('FAO/GAUL/2015/level2').filterBounds(geometry);

// 1. Classified hydormeteors from CSU Tool in Python
//var FH_IMG = FH.first().select('b1').clip(roi);
var FH = ee.ImageCollection('projects/ee-my-yang1/assets/hail1hour_all')
  .filterBounds(roi)
  .filterDate('2020-04-23T12:00:00', '2020-04-23T12:59:00');

var FH_IMG = FH.first().select('b1').clip(roi);  


// 2. Composite 1 hour of solid classed for classified hydormeteors classes
// Group Solid Class (1-2) and mask liquid class (3-10)
//liquid >>1= Drizzle; 2=Rain ; 
//solid >> 3-10= Ice Crystals, Aggregates, Wet Snow, Vertical Ice, LD Gruapel, HD Gruapel, Hail, Big Drops  
var Solid_FH = FH_IMG.updateMask(FH_IMG.gt(0)) //
        // set all values to 1 (instead of keeping the original values)
        .gt(0).selfMask()
        // rename the band
        .rename('solid_FH');

// 3.LULC
var lu = ee.Image('COPERNICUS/Landcover/100m/Proba-V-C3/Global/2019')
                .select('discrete_classification').clip(roi);

// 4.Population
var dataset = ee.ImageCollection('JRC/GHSL/P2023A/GHS_POP').first().clip(roi);
var population_count = dataset.select('population_count');

// 5. Open buildings
var bldg_all = ee.FeatureCollection('GOOGLE/Research/open-buildings/v3/polygons').filterBounds(roi);
var t = ee.FeatureCollection('GOOGLE/Research/open-buildings/v3/polygons');
Map.addLayer(bldg_all, {color: 'CDD5DA'}, 'All Buildings',true, 0.5);

var t_065_070 = t.filter('confidence >= 0.65 && confidence < 0.7').filterBounds(roi);
var t_070_075 = t.filter('confidence >= 0.7 && confidence < 0.75').filterBounds(roi);
var t_gte_075 = t.filter('confidence >= 0.75').filterBounds(roi);

var bldg_all = t.filter('confidence >= 0.75').filterBounds(roi);


//Map.addLayer(t_gte_075, {color: '00FF00'}, 'Buildings confidence >= 0.75',true, 0.7);
//Map.addLayer(t_065_070, {color: 'FF0000'}, 'Buildings confidence [0.65; 0.7)');
//Map.addLayer(t_070_075, {color: 'FFFF00'}, 'Buildings confidence [0.7; 0.75)');

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//======== Spatial Analysis

//1. Solid class
var b1scale = Solid_FH.select('solid_FH').projection().nominalScale();
//--> extract only Solid freezing class
var Solid_mask = Solid_FH.eq(1);
var Solid_area = Solid_FH.updateMask(Solid_mask);
var Solid_pixelarea = Solid_area.multiply(ee.Image.pixelArea());
//--> find area of solid class
var Solid_stats = Solid_pixelarea.reduceRegion({
  reducer: ee.Reducer.sum(), 
  geometry: roi,
  scale: b1scale, 
  maxPixels: 1e9
  });
//--> convert square km to Thai area unit "rai"
var Solid_area_rai = Solid_stats
  .getNumber('solid_FH')
  .divide(1000000)
  .multiply(625) //แปลงตารางกิโลเมตรเป็นไร่ นั่นคือ 1 ตารางกิโลเมตรเท่ากับ 625 ไร่
  .round();    

print('area of solid class in rai: ', Solid_area_rai);  


//2. Land cover (40 = Crop/Agricultural Lands ; 50 = Urban/ Build upt areas)
//2.1 Find area of Crop/Agricultural Lands
//--> find where crop land class of 40 affected by solid freezing class
var cropmask = lu.eq(40); 
var cropland = lu.updateMask(cropmask);

//--> check projections before doing spatial analyse
var cropland_projection = cropland.projection();
var Solid_projection = Solid_area.projection();
// projections are different then it need to reproject solid class's projection to be the same as cropland
var Solid_res = Solid_area // reproject
    .reproject({
    crs: cropland_projection
  });

//--> find area of crop land class = 40
var cropland_affected = Solid_res
  .updateMask(cropland)

var crop_pixelarea = cropland_affected
  .multiply(ee.Image.pixelArea()); 
  
// Get scale (in meters) information 
var Crop_scale = cropland.select('discrete_classification').projection().nominalScale();
var crop_stats = crop_pixelarea.reduceRegion({
  reducer: ee.Reducer.sum(), 
  geometry: roi,
  scale: Crop_scale, 
  maxPixels: 1e9
  });

//--> convert square km to Thai area unit "rai"
var Crop_area_rai = crop_stats
  .getNumber('solid_FH')
  .divide(1000000)
  .multiply(625) //แปลงตารางกิโลเมตรเป็นไร่ นั่นคือ 1 ตารางกิโลเมตรเท่ากับ 625 ไร่
  .round();      

print('area of affected Crop class 40 in rai: ', Crop_area_rai); 

//2.2 Find area of Urban/ Build upt areas
//--> find where urban class 50 affected by solid freezing class
var urbanmask = lu.eq(50); 
var urbanland = lu.updateMask(urbanmask);
//--> check projections before doing spatial analyse
var urbanland_projection = urbanland.projection();
var Solid_projection = Solid_area.projection();
// projections are different then it need to reproject solid class's projection to be the same as urban class
var Solid_res = Solid_area // reproject
    .reproject({
    crs: urbanland_projection
  });

//--> find area of urban class = 50
var urbanland_affected = Solid_res
  .updateMask(urbanland)

var urban_pixelarea = urbanland_affected
  .multiply(ee.Image.pixelArea()); 
  
// Get scale (in meters) information 
var urban_scale = urbanland.select('discrete_classification').projection().nominalScale();
var urban_stats = urban_pixelarea.reduceRegion({
  reducer: ee.Reducer.sum(), 
  geometry: roi,
  scale: urban_scale, 
  maxPixels: 1e9
  });

//--> convert square km to Thai area unit "rai"
var urban_area_rai = urban_stats
  .getNumber('solid_FH')
  .divide(1000000)
  .multiply(625) //แปลงตารางกิโลเมตรเป็นไร่ นั่นคือ 1 ตารางกิโลเมตรเท่ากับ 625 ไร่
  .round();    
  
print('area of affected urban class 50 in rai: ', urban_area_rai);  


//3.population (find where population affected by solid freezing class)
//--> check projections before doing spatial analyse
var pop_projection = population_count.projection();
var Solid_projection = Solid_area.projection();
// projects are different then do reprojection
var Solid_res = Solid_area
    .reproject({
    crs: pop_projection
  });

//--> find population affected by solid class
var population_exposed = population_count
  .updateMask(Solid_res)
  .updateMask(population_count);
  
//-- find number of population in affected area
var Pop_scale = population_count.select('population_count').projection().nominalScale();

var stats = population_exposed.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: roi,
  scale: Pop_scale,
  maxPixels:1e9 
});

//-- count number exposed population
var number_pp_exposed = stats.getNumber('population_count').round();
print('pop_exposed_stats: ',number_pp_exposed);


//4. Building
//--> Define solid class by threshold
var solid_zones_raster = Solid_FH.gt(0);
solid_zones_raster = solid_zones_raster.updateMask(solid_zones_raster.neq(0));

//--> convert raster of solid class to vector
// Get scale (in meters) information from band 1.
var Solid_scale = Solid_FH.select('solid_FH').projection().nominalScale();

var solid_zones_vectors = solid_zones_raster.addBands(Solid_FH).reduceToVectors({
  geometry: roi,
  crs: Solid_FH.projection(),
  scale: Solid_scale,
  geometryType: 'polygon',
  eightConnected: false,
  labelProperty: 'zone',
  reducer: ee.Reducer.mean()
});

Map.addLayer(solid_zones_vectors, {color: '09F8ED'}, 'solid_zones_vectors');

//--> Filter buildings within the polygon
var buildingsInPolygon = bldg_all.filterBounds(solid_zones_vectors);
// Count the number of buildings
var buildingCount = buildingsInPolygon.size();
// Print the building count
print("Number of Affected Houses:", buildingCount);

//--> Calculate the sum of building areas
var buildingAreaSum = buildingsInPolygon.reduceColumns({
  reducer: ee.Reducer.sum(),
  selectors: ['area_in_meters']  
}).get('sum');

// Print the building count
print("Total area sum of Affected Houses:", buildingAreaSum);

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
// Map Visualization

Map.centerObject(roi,10);
Map.setOptions('SATELLITE'); 

//==>> 1.roi
var styling = {color: 'red', fillColor: '00000000', width: 4};
Map.addLayer(roi.style(styling), {},'Chiangkhong_bnd', true, 0.3);

//===> 2.classified hydrometeors
Map.addLayer(FH_IMG, {min: 1, max: 10, palette: [
              'LightBlue', 'MediumBlue', 'DarkOrange', 
              'LightPink','Cyan', 'DarkGray', 'Lime', 
              'Yellow', 'Red', 'Fuchsia']}, 
              'Classified hydrometeors', false, 0.3);

//==>> 3.solid (Freezing) precipitation

Map.addLayer(Solid_FH, {color: '09F8ED'}, 'solid_freezing_zones', true, 0.6);
//Map.addLayer(Solid_FH, {min: 0, max: 1, palette: [
//              'Blue',  'DarkRed']}, 
//              'Solid', true, 0.6)   
              

//==>> 4.Land cover
Map.addLayer(lu.clip(roi), {}, 'Land Cover', false, 0.7);

//==>> 5.population
var pop_vis = {
  'max': 100.0,
  'palette': [
    'Aqua',
    'Green',
    'Yellow',
    'Gold',
    'OrangeRed',
    'DarkRed'
  ],
  'min': 0.0
};
Map.addLayer(population_count, pop_vis, 'population_count', false, 0.5);  


//===> 6.Affected population
Map.addLayer(population_exposed, {min: 0, max: 1, palette: [
              'Blue',  'Magenta']}, 
              'population_exposed', false, 1.0)   

//==>> 7.Affected land cover
Map.addLayer(cropland_affected, {min: 0, max: 1, palette: [
              'Blue',  'Magenta']}, 
              'cropland_affected', true, 1.0)     

Map.addLayer(urbanland_affected, {min: 0, max: 1, palette: [
              'Blue',  'Orange']}, 
              'urbanland_affected', true, 1.0)  
              

//===>> 8.Affected building
Map.addLayer(buildingsInPolygon, {color: 'FA1F05'}, 'buildings_affected');


/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
// Panel Visualization

//==> Building
// Create a styled panel to display the building information
var panel = ui.Panel({
  style: {
    position: 'top-right',
    width: '300px',
    padding: '10px',
    backgroundColor: 'EBEBEB',
    border: '1px solid #ccc'
    
  }
});

var title = ui.Label('Assessment of Affected Hail Area', {
  fontWeight: 'bold',
  fontSize: '16px',
  color: 'red',
  margin: '0 0 10px 0'
});

var solidAreaLabel = ui.Label('Solid Freezing area (Rai): ' + Solid_area_rai.getInfo(), {
  fontSize: '14px'
});


var popLabel = ui.Label('Affected population: ' + number_pp_exposed.getInfo(), {
  fontSize: '14px'
});


var buildingCountLabel = ui.Label('Number of Affected Houses: ' + buildingCount.getInfo(), {
  fontSize: '14px'
});

var buildingAreaLabel = ui.Label('Total Affected Building Area (Sq.meter.): ' + buildingAreaSum.getInfo() , {
  fontSize: '14px'
});

var cropAreaLabel = ui.Label('Affected Crop area (Rai): ' + Crop_area_rai.getInfo(), {
  fontSize: '14px'
});

var urbanAreaLabel = ui.Label('Affected Urban area (Rai): ' + urban_area_rai.getInfo(), {
  fontSize: '14px'
});

panel.add(title);
panel.add(solidAreaLabel);
panel.add(popLabel);
panel.add(buildingCountLabel);
panel.add(buildingAreaLabel);
panel.add(cropAreaLabel);
panel.add(urbanAreaLabel);

ui.root.widgets().add(panel);