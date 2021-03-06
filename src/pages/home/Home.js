import React from "react";
import { useState, useCallback, useContext, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { TextField, InputBase } from "@material-ui/core";

// styles
import useStyles from "./styles";

// components
import Post from "./post"
import Widget from "../../components/Widget/Widget";
import { storage } from "../../Util/firebase"
// import { useForm } from '../../shared/hooks/form-hook';
// import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../context/auth-context';

import axios from "../../Util/axios"
import AuthService from "../../services/auth.service";
import { v4 as uuidv4 } from 'uuid';
import GetAllPosts from './getPosts'

let post = {
  userID: "",
  username: "",
  text: "",
  image: "",
  likes: 0,
  time: "",
  comments: {}
}

//let allPosts = [];

// const getPosts = async () => {

//   async function fetchData() {
//     let request;
//     request = await axios.get("http://localhost:8080/dashboard/Home")
//     console.log("request")
//     //console.log(request.data)
//     allPosts = request.data;
//     return request.data;
//   }
//   //And here you call it
//   fetchData()
// }

// getPosts()
// console.log("getPosts")
// console.log(allPosts)

export default function Home(props) {

  //useEffect(() => {

  var [allPosts, setAllPosts] = useState()
  var [kee, setKee] = useState()
  // var [loadPosts, setLoadPosts] = useState(false);
  //var [allowPost, setAllowPost] = useState(false)

  const getPosts = useCallback(async (bool) => {
    async function fetchData() {
      let request;
      request = await axios.get("http://localhost:8080/dashboard/Home")
      console.log("request")
      setAllPosts(request.data)
      return request.data;
    }
    //And here you call it
    fetchData()
  }, [])

  const auth = useContext(AuthContext);
  var classes = useStyles();

  const user = AuthService.getCurrentUser()

  useEffect(() => {
    getPosts()
    //getItems().then(data => setItems(data));
  }, []);

  // var [useridValue, setUseridValue] = useState("");
  // var [usernameValue, setUsernameValue] = useState("");
  var [textValue, setTextValue] = useState("");
  var [likesValue, setLikesValue] = useState(0);
  //var [timeValue, setTimeValue] = useState("");
  var [commentValue, setCommentValue] = useState([]);
  var [imgBoolean, setImageBoolean] = useState()

  let postBool;
  let imgBool;

  const allInputs = { imgUrl: '' }
  const [imageAsFile, setImageAsFile] = useState('')
  const [imageAsUrl, setImageAsUrl] = useState(allInputs)

  const handleImageAsFile = (e) => {
    const image = e.target.files[0]

    if (image != undefined) {
      var imageExtension = image.name.split('.').pop();
      console.log(imageExtension)
    }

    let newImage = uuidv4() + '.' + imageExtension;
    console.log(newImage)

    setImageAsFile(imageFile => (image))//(newImage))

    imgBool = true
    setImageBoolean(true)
  }

  const handleFireBaseUpload = e => {
    //e.preventDefault()
    console.log('start of upload')
    // async magic goes here...
    if (imageAsFile === '') {
      console.error(`not an image, the image file is a ${typeof (imageAsFile)}`)
    }
    const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)

    //initiates the firebase side uploading 
    uploadTask.on('state_changed',
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot)
      }, (err) => {
        //catches the errors
        console.log(err)
      }, () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        storage.ref('images').child(imageAsFile.name).getDownloadURL()
          .then(fireBaseUrl => {
            setImageAsUrl(prevObject => ({ ...prevObject, imgUrl: fireBaseUrl }))
          })

      })
  }

  const postSubmit = (PostBool) => {

    let current = new Date()
    let year = current.getFullYear().toString();
    let month = current.getMonth() + 1;
    let day = current.getDate();

    let hours = current.getHours().toString();
    let minutes = current.getMinutes();
    let seconds = current.getSeconds();

    let finalDate = year.concat("/", month, "/", day)
    let finalTime = hours.concat(":", minutes, ":", seconds)

    let timee = finalDate.concat(" ", finalTime)

    console.log("inside postSubmit")

    post.userID = user._id
    post.username = user.username
    post.text = textValue
    post.image = imageAsUrl.imgUrl
    post.likes = likesValue
    post.time = timee
    post.comments = commentValue

    console.log(postBool)

    console.log("Post")
    console.log(post)
    sendRequest(postBool)
  }

  //Snippet of code which runs based on a specific condition 
  const sendRequest = useCallback(async (postBool) => {

    console.log("inside useEffect")
    async function fetchData() {
      //await means wait for the requests come back
      console.log('inside fetchdata')
      let request;
      console.log(postBool)
      if (postBool === true) {

        console.log("inside post")
        console.log(post)
        request = await axios.post("http://localhost:8080" + props.fetchUrl, post)
        console.log("request")
        console.log(request)
        // if (loadPosts === true) {
        //   setLoadPosts(false)
        // } else {
        //   setLoadPosts(true)
        // }
        window.location.reload()
        return request;
      } else {
        console.log("post is false")
      }
    }
    //And here you call it
    fetchData()
    postBool = false;

  }, [])

  if (imgBoolean === true) {
    console.log("inside if")
    if (imageAsUrl.imgUrl === '') {
      console.log("empty img")
      console.log(imageAsUrl.imgUrl)
    } else {
      console.log("inside else img")
      postBool = true
      postSubmit(postBool)
      setImageBoolean(false)
    }
  } else {
    console.log("bool:")
    console.log(imgBoolean)
  }

  console.log("Kee")
  console.log(kee)

  let displayPosts //= () => { let displayPostsVar

  if (allPosts != undefined) {
    console.log("inside displayPost")
    // {return <GetAllPosts allPosts= {allPosts}/>}
    displayPosts = allPosts.map((i) => {
      return <Post key={i._id} id={i._id}
        username={i.username} time={i.time} text={i.text} image={i.image} comments={i.comments} likes={i.likes} //onSelect={this.onSelect} 
      />
    })
  } else {
    console.log("nothing")
  }
  //}

  return (
    <>
      <Grid container spacing={4}>
        <Grid item md={8}>
          <Widget title="What's on your mind?" disableWidgetMenu>
            <form onSubmit={handleFireBaseUpload}>
              <TextField className={classes.textfield} value={textValue}
                onChange={e => setTextValue(e.target.value)} placeholder='Post here...'></TextField>

              <div className={classes.postbottom}>
                <div className={classes.postbottomL} >
                  {/* <PhotoIcon fontSize='large' className='icon' />
                <text>Upload photo</text> */}
                  <input
                    type="file"
                    onChange={handleImageAsFile}
                  />
                </div>
                <button className={classes.postButton}>Post</button>
              </div>
            </form>
          </Widget>
          {/* <div><img src={imageAsUrl.imgUrl} alt="image tag" /></div> */}
        </Grid>
        {/* <img src={imageAsUrl.imgUrl} alt="image tag" /> */}
        <div style={{ width: '95%', marginLeft: '15px' }}>
          {
            displayPosts
          }
        </div>
      </Grid>
    </>
  );
}