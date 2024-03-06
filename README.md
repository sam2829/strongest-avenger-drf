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

The Comment model is linked is linked to the Posts model by foreign key using a one to many relationship to store comments for a specific post.
The Comment model is also linked to the User model by foreign key using a one to many relationship to allow for comments to be linked back to a specific user and their profile.
When the user is making a comment on a post they they can also select whether they a agree or not that the character in the post is the strongest avenger.

***Follow***

***Like***

***Report***