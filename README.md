# Project Readme

A refactoring / continuation of my [original note-ed](https://github.com/Calvinbullock/Note-ed) project into typescript.

## site links

[Live Site](https://noted-eeafd.web.app)

## dev testing

Run testing / dev server

- `npm run start`

## firebase deployment / setup

##### build / deploy

- run `./deploy.sh` from main branch

#### or

- `npm run build`
- `firebase deploy`

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
