// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

// ERC721(contract name, symbol for the contract)
contract TwitterDapp is ERC721("TwitterDApp", "TDAPP") {
    uint256 tokenId; // defaults to 0 - used for indexing the tweet in the tweets array

    struct tweet {
        // tweet detail as posted by the tweet owner
        string name; // author of the tweet
        string description; // tweet itself
        address fromAddress; // address of the author
        // community interaction with the tweet - later we can define the structure of upvotes & comments as well
        uint256 upvotes; // later we can keep track of addresses from which an upvote was posted
        string[] comments; // later we can keep track of addresses from which a comment was posted
    }

    tweet[] public tweets;

    function tokenURI(uint256 _tokenId)
        public
        view
        override
        returns (string memory)
    {
        bytes memory dataURI = abi.encodePacked(
            '{"name":"',
            tweets[_tokenId].name,
            '","description":"',
            tweets[_tokenId].description,
            '", "attributes": [{ "trait_type": "Upvotes", "value": ',
            Strings.toString(tweets[_tokenId].upvotes),
            "}]}"
        );

        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(dataURI)
                )
            );
    }

    function writeTweet(string memory name, string memory description) public {
        // assign current tokenId to the address of the user writing the tweet - minting the tweet
        _safeMint(msg.sender, tokenId);

        // build a tweet from provided data
        tweets.push(
            tweet({
                name: name,
                description: description,
                upvotes: 0,
                comments: new string[](0),
                fromAddress: msg.sender
            })
        );

        tokenId += 1;
    }

    function addComment(uint256 tweetIndex, string memory comment) public {
        tweets[tweetIndex].comments.push(comment);
    }

    function upVote(uint256 tweetIndex) public {
        tweets[tweetIndex].upvotes += 1;
    }

    function getAllTweets() public view returns (tweet[] memory) {
        return tweets;
    }
}

// Deployed Contract Address on Polygon Mumbai Network - 0x46653e9070a6dec0FD36ac557320ae8580DC016E
