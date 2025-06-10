# Project Readme

## site links
[Live Site](https://noted-eeafd.web.app)

## dev testing
Run testing  / dev server
- `npm start`

## firebase deployment / setup

##### Deploy a production page
- should deploy a build every time a change is pushed/megerd to main git branch -- DISABLED

##### if auto prod build fails
- run `./deploy.sh` from main branch

#### or
- `npm run build`
- `firebase deploy`

[Live Site](https://noted-eeafd.web.app)

## Feature Milestones
- Must Have's
    - 1 - ~~add remove notes~~
    - 2 - ~~sign in capabilities~~
    - 3 - ~~database back and forth~~
    - 5 - ~~nice looking and responsive UI (mobile, desktop, etc)~~
    - 6 - ~~user driven UI (sorting, search)~~

- Nice Have's
    - 1 - ~~edit / update existing notes~~
    - 2 - ~~device / tab synchronization (new notes show with out reload)~~
    - 3 - ~~input sanitation~~
    - 4 - Due date indicator

## TODO
```
ACTIVE TICKET
- due date passed icon

- notes additions
    - add clear search button
    - confirm delete
    - click and drag??

- Auth
    - make login div wider
    - if not logged in send user right to login
    - check the user is supposed to have accuses to the note

- note styling
    - see about getting note content to stay in it's original format (not all Squished)
    - make sure really really long words wrap properly
    - keep editor in place as user scrolls

```

## Other ideas to add
- Pin notes?
- Synchronization between two devices/tabs
- Cool new note, expand area to enter note, like keep functionality.
- Edit automatically pops the text back up to the note editing area (like keep). (week 7)

### Pining notes - ideas
- add a flag `pined: T/F`
```js
if (pinned) {
    add to pinned list
    removed from normal list
}
```

## resources
- [FireBase CRUD](https://www.youtube.com/watch?v=2hR-uWjBAgw)

- [Firebase React Course For Beginners](https://www.youtube.com/watch?v=2hR-uWjBAgw)
- [Building Your first React Web Application](https://www.youtube.com/watch?v=NzpbupWoIV4)
- [Axios docs](https://axios-http.com/docs/api_intro)
- [react rest APIs](https://www.freecodecamp.org/news/how-work-with-restful-apis-in-react-simplified-steps-and-practical-examples/#heading-31-the-fetch-api)

- [link to firebase setup portal](https://www.freecodecamp.org/news/how-to-deploy-a-react-app-with-firebase/)

### firebase docs
- [rest API code](https://firebase.google.com/docs/firestore/use-rest-api#making_rest_calls)
- [rest API requests](https://firebase.google.com/docs/firestore/reference/rest/)


