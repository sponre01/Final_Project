# Final Project
The Final Project for Northwestern's Data Science Bootcamp! Thank you all for sticking with us through this crazy whirlwind adventure -  we've learned so much and are super proud of how much we've been able to accomplish with just 6 months of dedicated work. We all still have quite a ways to go, but we're leaving this course confident that we've squeezed out as much as we can.

__Team Members__: haneenammouri, jzefron, Michele-Lodl and sponre01

### Data
For our final project, we are revisiting the Divvy bike data we originally used in our ETL project. See https://www.divvybikes.com/system-data for the original csv files.
<br>
<br>
<br>
### Tableau
We found Tableau to be an excellent way to play around with the data and search for interesting trends before going hard into our machine learning portion. Here are some of the things we found.

__Age Distribution of Divvy Rider Base__  
- The overall average age of Divvy riders is 36 years.
![alt text](https://github.com/sponre01/Final_Project/blob/master/charts/Age_distribution.PNG)

__Trip Durations by Gender__  
- The overall average trip duration is 24.39 minutes.
- Keep in mind that this includes "null" values - Divvy only collects demographic information for members, so there is a large portion of data that does not include gender information.
- There's not a big difference between male and female trip duration (but we can infer here that non-members seem to take longer trips than members do - this might be something interesting to look into if we wanted to spend more time on this!)

![alt text](https://github.com/sponre01/Final_Project/blob/master/charts/Trip_duration_vs_gender_including_nulls.PNG)

__Most Popular Stations__  
- Top Departure Station: Streeter Dr & Grand Ave (21,741)
- Top Destination Station: Canal St & Adams St (17,198)
- We created a Leaflet map that shows the location of these stations, and shaded by census tract to help us visualize the Chicago neighborhoods

![alt text](https://github.com/sponre01/Final_Project/blob/master/charts/Top_20_Departures.PNG)
![alt text](https://github.com/sponre01/Final_Project/blob/master/charts/Top_20_Destinations.PNG)
![alt text](https://github.com/sponre01/Final_Project/blob/master/charts/map_example.PNG)

<br>
<br>
<br>

### The Website
We used bootstrap and some HTML/CSS magic to create a website to display these visualizations, featuring:
- An analysis section including link to our graphs
- An interactive section with a tabular menu option. The user can switch between "Traffic" and "Map"
- A link to our github (you are here!)

![alt text](https://github.com/sponre01/Final_Project/blob/master/charts/Website_view_1.PNG)

<br>
<br>
<br>

###
