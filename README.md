# Stongest Avenger DRF API

## Overview

Strongest Avenger API is designed for a specific React frontend project so that the user is able to create an account, update there own profile, make posts whether it be an image or video of there favourite marvel character, comment on others posts, like a post, agree with a post and follow other users. 
The user is also able to view different posts by whether they are the posts they like, they are posts by another user they follow or they are the posts by how they have decided to search for posts.

## Project Goals

This is part of my fifth  portfolio project for the Code Institute and the goal with this project is to display my new skills in using frameworks such as Django Rest (for the API backend) and React (for the frontend). I have decided to build a social website where users are able to create accounts and make posts on their favourite Marvel characters. The User can also comment, like and agree on others posts and being able to follow other users to see their posts.

## Contents

- [Strongest Avenger DRF API](#strongest-avenger-drf-api)
  - [Overview](#overview)
  - [Project Goals](#project-goals)
  - [Planning](#planning)
    - [Data Models](#data-models)
  - [API Endpoints](#api-endpoints)
  - [Technologies Used](#technologies-used)
    - [Languages Used](#languages-used)
    - [Frameworks and Tools Used](#frameworks-and-tools-used)
    - [Libraries Used](#libraries-used)

## Planning

Planning started by using agile methodologies by delivering small features across the duration of the project. This broke down the build of the project into a lot more manageable parts and was able to select which user stories were more important to the site. The userstories were then used to help create wireframes to see how the user would navigate and use the app. This can all be seen in more details in the React frontend repository.
These were then used to help work out the required API endpoints to support the desired functionality of the site.

dfjdfjd endpoint diagram go here????

### Data Models

Data model schema was planned with the API endpoints, using an entity relationship diagram to show how the models were related.

The custom models in Strongest Avenger DRF API are:

***Profile***

The Profile model is linked using a one to one relationship with the built in User model in conjunction with Django Allauth, with the user profile being created automatically when the user registers an account.
The user then is able to edit their own profile with their name, favourite character, profile image and content about themselves.

***Posts***

The Posts model is linked to the User model by foreign key using a one to many relationship, this allows for posts to be linked back to the specific user and their profile.
The user when making a post can also write the character name of who they are posting, what category the character would come under, title, content and then select eeither an image or a video to post.

***Comment***

The Comment model is linked to the Posts model by foreign key using a one to many relationship to store comments for a specific post.
The Comment model is also linked to the User model by foreign key using a one to many relationship to allow for comments to be linked back to a specific user and their profile.
When the user is making a comment on a post they they can also select whether they a agree or not that the character in the post is the strongest avenger.

***Follow***

The Follow mode is linked to the User model by foreign key using a one to many relationship. This is the case for both fields owner and followed. These fields have related names "following" and "followed". This allows the user to follow multiple users and also have multiple users following them.
The Model also makes sure that a user can not follow or be followed by a user multiple times.

***Like***

The Like model is linked to the User model by foreign key using a one to many relationship so that any likes can be linked back to a specific user and their profile.
The Like model is also linked to the Post model by foreign key using a one to many relationship to store likes for a specific post.
The model also makes sure that a user can not like the same post twice.

***Report***

The Report model is linked to the User mode by foreign key using a one to many relationship so that any reports can be linked back to a specific user and their profile.
The Report model is also linked to the post Post model by foreign key using a one to many relationship to so that any reports can be linked back to the post with the issue.
In the Report model the user will also be provided a select choices for the reason for the report and a description to explain.
There is also a Boolean field top select whether the issue has been resolved, this is strictly for admin to select once they have resolved the issue.

An entity relationship diagram was created using drawSQL to show the schemas for each of the models and how they are related:

![ERD Screenshot](docs/readme_screenshots/erd-screenshot.png)

[back to top](#strongest-avenger-drf-api)

## API Endpoints

| URL | HTTP Method | CRUD Operation | View name |
| --- | --- | --- | --- |
| `Profile Endpoints` |
| /profiles | GET | List all profiles | LIST |
| /profiles/:id | GET | Retrieve a profile by id | DETAIL |
| /profiles/:id | PUT | Edit / update profile by id | DETAIL |
| ` Posts Endpoints` |
| /posts | GET | List of all posts | LIST |
| /posts | POST | Create a post | LIST |
| /posts/:id | GET | Retrieve a post by id | DETAIL |
| /posts/:id | PUT | Edit / update a post by id | DETAIL |
| /posts/:id | DELETE | Delete a post by id | DETAIL |
| ` Comment Endpoints` |
| /comments | GET | List of all comments | LIST |
| /comments | POST | Create a comment | LIST |
| /comments/:id | GET | Retrieve a comment by id | DETAIL |
| /comments/:id | PUT | Edit / update a comment by id | DETAIL |
| /comments/:id | DELETE | Delete a comment by id | DETAIL |
| `Follow Endpoints` |
| /followers | GET | List of all followers | LIST |
| /followers | POST | Create a new follower | LIST |
| /followers/:id | GET | Retrieve follower by id | DETAIL |
| /followers/:id | PUT | Edit / Update follower by id | DETAIL |
| /followers/:id | DELETE | Delete follower by id | DETAIL |
| `Like Endpoints` |
| /likes | GET | List of all likes | LIST |
| /likes | POST | Create a like | LIST |
| /likes/:id | GET | Retrieve like by id | DETAIL |
| /likes/:id | DELETE | Delete like by id | DETAIL |
| `Report Endpoints` |
| /report | POST | Create a new report | LIST |

[back to top](#strongest-avenger-drf-api)

## Technologies Used

### Languages Used

- Python

### Frameworks and Tools Used

- Django Rest Framework
  - Django Rest Framework was used as the main python framework in the development of this project.
- ElephantSQL
  - ElephantSQL was used for the production database.
- Cloudinary
  - Cloudinary was used to store the images and videos posted.
- Gitpod
  - Gitpod was used to write the code.
- Github
  - Github was used to store the projects code after being pushed from Gitpod.
- Heroku
  - Heroku was used for deployment.
- DrawSQL
  - DrawSQL was used to draw out the entity relationship diagram.

### Libraries Used

- Django - A python pakage for the django rest framework.
- Django Allauth - An integrated set of applications used for user authentication, registration and account management.
- Django rest auth - Provides REST API endpoints for login and logout.
- django rest framework-simplejwt - Used for JSON web token authentication.
- psychopg2 - Database adapter to enable interaction between Python and PostgreSQL database.
- django cors headers - This Django app adds CORS headers to responses, to enable the API to respond to requests from origins other than it's own host.
- Cloudinary - Used to store images and videos.
- Pillow - Used for image processing.
- Django Signal - Used to create a profile everytime a user is created.
- moviepy - Used to validate the length of video posted.
- python magic - Used to check if post being created contains image or video.
- gunicorn - Used to help run application.
- django filter - Used to help filter searches.

[back to top](#strongest-avenger-drf-api)

## Testing

I have included details of my testing during and post development in a seperate file called [TESTING.md](TESTING.md)

[back to top](#strongest-avenger-drf-api)