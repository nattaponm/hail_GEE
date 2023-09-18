# hail_GEE
Create hourly hail product and analyze in Google Earth Engine

****Readme****

(In ENG)
This research project aims to enhance the production of hourly hailstorm products by utilizing dual polarimetric radar data from the Thai Meteorological Department's Chiang Rai station. The radar data was collected during a severe hailstorm event that occurred in the Chiang district of Chiang Rai province on April 23, 2020, resulting in significant damage to over 500 residential roofs. The radar data was processed to discriminate hailstorm data, including differentiating between various types of frozen hydrometeors, and was transformed into a 2-kilometer grid CAPPI format. Subsequently, the data was exported as GeoTIFF files for spatial analysis. Additionally, this research project demonstrates the spatial analysis of the hourly hailstorm product using the cloud-based processing system of Google Earth Engine (GEE), combining the research-derived hailstorm product with Google Earth Engine's open data layers. The developed codebase comprises two parts: the Python-based development of hailstorm products and the JavaScript-based spatial impact analysis of hailstorms within GEE.

Python-Based Development of Hailstorm Products:

simulateSoundingFromERA5ForPlottingskewT.ipynb
1Plot thermodynamic diagram from simulated sounding.ipynb
2classifyHydrometeor4filesIn1hour.ipynb
3Aggregate classified hydrometeor from 15 min to 1 hour product.ipynb

JavaScript-Based Spatial Impact Analysis of Hailstorms in GEE:
4GEE_hail_impact_assessment.js
you can try GEE code : https://code.earthengine.google.com/ce13b5ba25d59c3de18ae9d62b9f8072


This research project aims to contribute valuable insights into hailstorm monitoring and impact assessment through the utilization of state-of-the-art radar technology and geospatial analysis tools.
If you have any question, please feel free to contact me Dr.Nattapon Mahavik, Naresuan University, Thailand by nattaponm@nu.ac.th

(In Thai)
งานวิจัยชิ้นนี้ ได้มุ่งพัฒนาผลิตภัณฑ์ลูกเห็บรายชั่วโมง จากข้อมูล dual polarimetric radar ของ Thai Meteorological Department สถานีเชียงราย ที่ทำการกวาดข้อมูลเรดาร์ราย 15 นาที ด้วยการสาธิตจากเหตุการณ์พายุลูกเห็บถล่มในพื้นทีอำเภอเชียงของ จังหวัดเชียงราย ในวันที่ 23 เมษายน 2020 ที่ทำให้บ้านเรือนของประชาชนเสียหายจำนวนมากกว่า 500 หลังคาเรือน ข้อมูลเรดาร์ถูกนำมาจำแนกออกเป็นข้อมูลกลุ่มลูกเห็บที่รวมกลุ่มจากหยาดน้ำฟ้าชนิดของแข็ง ทำเป็นข้อมูลกริดแบบ CAPPI ที่มีความสูง 2 กิโลเมตร แล้วส่งออกไปอยู่ในรูปของ GeoTIFF ที่สามารถนำไปใช้วิเคราะห์เชิงพื้นที่ได้ นอกจากนั้น งานวิจัยชิ้นนี้ยังมุ่งสาธิตการวิเคราะห์เชิงพื้นที่ข้อมูลผลิตภัณฑ์ลูกเห็บรายชั่วโมง ในระบบการประมวผลแบบ cloud ของ Geoogle Earth Engine (GEE) จากข้อมูลผลิตภัณฑ์ลูกเห็บที่เป็นผลลัพธ์การวิจัยนี้ ร่วมกับชั้นข้อมูล Opendata ของ Google Eart Engine  โค้ดที่ได้พัฒนา แบ่งออกเป็นสองส่วนได้แก่ 
1.การพัฒนาผลิตภัณฑ์ลูกเห็บ ในภาษา python ได้แก่
0simulateSoundingFromERA5ForPlottingskewT.ipynb
•	1Plot thermodynamic diagram from simulated sounding.ipynb
•	2classifyHydrometeor4filesIn1hour.ipynb
•	3Aggregate classified hydrometeor from 15 min to 1 hour product.ipynb
2.การพัฒนากระบวนการวิเคราะห์ผลกระทบลูกเห็บเชิงพื้นที่ใน GEE ในภาษา JavaScript
•	4GEE_hail_impact_assessment.js ลองเล่น code : https://code.earthengine.google.com/ce13b5ba25d59c3de18ae9d62b9f8072****
หากมีคำถามหรือข้อสงสัยประการใด สามารถติดต่อ ผศ.ดร.นัฐพล มหาวิค มหาวิทยาลัยนเรศวร nattaponm@nu.ac.th
