# Stongest Avenger DRF API

## Testing Overview

During and post development of this project numerous testing was carried out by myself.

## Contents

- [Strongest Avenger DRF API](#stongest-avenger-drf-api)
  - [Testing Overview](#testing-overview)
  - [Contents](#contents)
  - [Manual Testing](#manual-testing)
  - [Automated Testing](#automated-testing)
  - [Validators](#validators)
    - [CI Python Linter](#ci-python-linter)

## Manual Testing

Manual testing was carried out throughout the project, making sure the site was functioning correctly.

Full test table:

| Feature | Expected Outcome| Testing Performed | Result | Pass / Fail |
| --- | --- | --- | --- | --- |
|`Profiles`|
| Profile is created when user is created. | When a user is created, the profile for the user is automatically created. | Created a superuser and view the profiles URL to see if it was created. | Went to the profiles URL and the profile was created. | Pass |
| Get list of profiles. | I am able to retrieve a list of all the profiles on the profiles URL page. | Went to the profiles URL. | On the profiles URL could see a list of all the profiles made. | Pass |
| Retrieve profile by id. | In the URL I can search for the profile by adding it's id number. | In the URL I add the id number following the profiles/. |  Only one profile on display which was the correct id number. | Pass |
| If user is logged in they can edit their profile. | When the user is logged in they are able to edit their own profile. | Logged in as a user and attempted to edit the profile. | Once logged in and on the correct profile, an edit form appeared underneath the profile and I was able to edit the profile details. | Pass |
| User can't edit anothers profile. | When user logged in and retrieve anothers profile, the edit form does not appear and user is unable to edit their profile. | Logged in as a user and retrieved a profile which wasn't that users profile. | The update form was not on the screen and was unable to edit their profile. | Pass |
| Profile edit form doesn't appear when logged out. | When a user is logged out and retrieves a post by id, the profiles update form does not appear. | Remained logged out and retrieved a profile by id. | The profile update form was not on display. | Pass |
| `Posts` |
| 