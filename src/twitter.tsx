import { useEffect } from "react";
import Leftbar from "./partials/leftbar";
import AddTweet from "./partials/addtweet";
import TweetListings from "./partials/TweetsListings";
import Search from "./partials/search";
import Trends from "./partials/trends";

function Twitter(props: any) {
  useEffect(() => {
    props.fetchAllTweets();
  }, []);

  return (
    <>
      <div className="twitter-main">
        <Leftbar signout={props.logoutButton} />
        <div className="center">
          <AddTweet
            handleNewTweetDescriptionChange={
              props.handleNewTweetDescriptionChange
            }
            handleNewTweetNameChange={props.handleNewTweetNameChange}
            addNewTweet={props.addNewTweet}
            fetchAllTweets={props.fetchAllTweets}
            refresh={props.refresh}
            username={props.username}
            profileimage={props.profileimage}
          />
          <TweetListings
            tweets={props.tweets}
            upVote={props.upVote}
            handleCommentChange={props.handleCommentChange}
            addComment={props.addComment}
          />
        </div>
          
        <div className="rightbar">
          <Search />
          <Trends />
        </div>
      </div>
    </>
  );
}

export default Twitter;
