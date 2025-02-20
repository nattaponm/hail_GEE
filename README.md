# hail_GEE
Create hourly hail product and analyze in Google Earth Engine

****Readme****

(In ENG)
This research focuses on developing an hourly hail detection product using dual-polarimetric radar data from the Thai Meteorological Department, specifically from the Chiang Rai radar station, which operates with a 15-minute scan interval. The study demonstrates its approach using a severe hailstorm event that occurred in Chiang Khong District, Chiang Rai Province, on April 23, 2020, causing damage to more than 500 houses. Radar data were processed to classify hail clusters formed from solid precipitation particles, generating a 2-km altitude CAPPI gridded product. The output was then exported as a GeoTIFF file, making it suitable for spatial analysis.

Additionally, this research demonstrates the spatial analysis of the hourly hail product using Google Earth Engine (GEE) cloud computing. The hail product generated in this study was integrated with Open Data layers available in GEE to assess hailstorm impacts.

1.The developed codebase is divided into two parts:
Hail product development using Python, which includes:
• 0simulateSoundingFromERA5ForPlottingskewT.ipynb: Simulating atmospheric sounding from ERA5 for Skew-T plotting.
• 1Plot thermodynamic diagram from simulated sounding.ipynb: Plotting a thermodynamic diagram from simulated sounding.
• 2classifyHydrometeor4filesIn1hour.ipynb: Classifying hydrometeors for four radar files in one hour.
• 3Aggregate classified hydrometeor from 15 min to 1 hour product.ipynb: Aggregating classified hydrometeor data into an hourly product.

2.Spatial analysis of hailstorm impacts using GEE in JavaScript
• 4GEE_hail_impact_assessment.js: Hail impact assessment in GEE. Try the code here: Google Earth Engine Code.
The research has been published in an academic journal and can be accessed at:
https://link.springer.com/article/10.1007/s12518-024-00569-4. A free version is available at: https://rdcu.be/d8jRX.

For any inquiries, please contact Associate Professor Dr. Nattapon Mahavik, Naresuan University, at nattaponm@nu.ac.th.

(In Thai)
งานวิจัยชิ้นนี้ ได้มุ่งพัฒนาผลิตภัณฑ์ลูกเห็บรายชั่วโมง จากข้อมูล dual polarimetric radar ของ Thai Meteorological Department สถานีเชียงราย ที่ทำการกวาดข้อมูลเรดาร์ราย 15 นาที ด้วยการสาธิตจากเหตุการณ์พายุลูกเห็บถล่มในพื้นทีอำเภอเชียงของ จังหวัดเชียงราย ในวันที่ 23 เมษายน 2020 ที่ทำให้บ้านเรือนของประชาชนเสียหายจำนวนมากกว่า 500 หลังคาเรือน ข้อมูลเรดาร์ถูกนำมาจำแนกออกเป็นข้อมูลกลุ่มลูกเห็บที่รวมกลุ่มจากหยาดน้ำฟ้าชนิดของแข็ง ทำเป็นข้อมูลกริดแบบ CAPPI ที่มีความสูง 2 กิโลเมตร แล้วส่งออกไปอยู่ในรูปของ GeoTIFF ที่สามารถนำไปใช้วิเคราะห์เชิงพื้นที่ได้ นอกจากนั้น งานวิจัยชิ้นนี้ยังมุ่งสาธิตการวิเคราะห์เชิงพื้นที่ข้อมูลผลิตภัณฑ์ลูกเห็บรายชั่วโมง ในระบบการประมวผลแบบ cloud ของ Geoogle Earth Engine (GEE) จากข้อมูลผลิตภัณฑ์ลูกเห็บที่เป็นผลลัพธ์การวิจัยนี้ ร่วมกับชั้นข้อมูล Opendata ของ Google Eart Engine  โค้ดที่ได้พัฒนา แบ่งออกเป็นสองส่วนได้แก่ 
1.การพัฒนาผลิตภัณฑ์ลูกเห็บ ในภาษา python ได้แก่
• 0simulateSoundingFromERA5ForPlottingskewT.ipynb
•	1Plot thermodynamic diagram from simulated sounding.ipynb
•	2classifyHydrometeor4filesIn1hour.ipynb
•	3Aggregate classified hydrometeor from 15 min to 1 hour product.ipynb

2.การพัฒนากระบวนการวิเคราะห์ผลกระทบลูกเห็บเชิงพื้นที่ใน GEE ในภาษา JavaScript
•	4GEE_hail_impact_assessment.js ลองเล่น code : https://code.earthengine.google.com/ce13b5ba25d59c3de18ae9d62b9f8072****

อ่านงานวิจัยที่เผยแพร่ในวารสารวิชาการได้ที่ https://link.springer.com/article/10.1007/s12518-024-00569-4 อ่านฟรีได้ที่ลิงก์ https://rdcu.be/d8jRX
หากมีคำถามหรือข้อสงสัยประการใด สามารถติดต่อ รองศาสตราจารย์ ดร.นัฐพล มหาวิค มหาวิทยาลัยนเรศวร nattaponm@nu.ac.th

