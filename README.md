# PokeRec
An app that recognizes pokemon cards with your camera, and tells you how much your pokemon cards are worth, and even where to buy more of them!

##How we made it
We used React Native in order for it to be compatible for both Android and iOS devices. We used the React-Native-Camera library to create a camera interface in the app. We used
Axios to make API calls to an unofficial pokemon card catelogue, which also allowed us to determine the value of cards. Pictures of the card are cropped, then those cropped
images are sent through AWS's API Gateway and Lambda Functions to an S3 bucket, where it is stored, and also sent to an AWS Rekognition computer vision machine learning
model that is trained with custom data to recognize specific icons that show up on the pokemon cards.
