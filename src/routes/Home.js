import React, { useState, useEffect, useRef } from "react";
import { dbService, storageService } from "FBase";
import Tweet from 'components/Tweet';
import TweetFactory from "components/TweetFactory";

 const Home = ({userObj}) => {
   const [tweets, setTweets] = useState([]);
   const isInitialMount = useRef(true);
   useEffect(() => {
    if (isInitialMount.current) {
        isInitialMount.current = false;
     } else {
        dbService.collection("tweets").onSnapshot(snapshot => {
            const tweetsArray =  snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
            setTweets(tweetsArray);
        });
     }
   }, []);
   return (
     <div>
         <TweetFactory userObj={userObj}/>
       <div>
         {tweets.map((tweet) => (
           <Tweet key={tweet.id} tweetObj={tweet} isOwner={tweet.creatorID === userObj.uid}/>
         ))}
       </div>
     </div>
   );
 };
export default Home;