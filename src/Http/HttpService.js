import config from "../Config/Config";
import firebase from "firebase";
class HttpService {
    constructor() {

    }
    writeBlogData(blogid, title, userID, content, preview) {
        firebase.database().ref('blog/' + blogid).set({
            id: blogid,
            title: title,
            date: new Date().toDateString(),
            author: userID,
            content: content,
            preview: preview
        });
    }
    readBlogData() {
        return firebase.database().ref('blog').once('value');
    }
    readBlogById(id){
        return firebase.database().ref('/blog/' + id).once('value');
    }
}
export default new HttpService();
// .then(function(snapshot) {
//     var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
//     // ...
//   });