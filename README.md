## Inspiration

- Imagine you have just landed on a random location, you haven’t bought any data plans yet. But looking for somewhere to stay before you continues a journey. What are you going to do if you’re not familiar with the local language?
- Elderlies loved to travel could face this issue, they have their mobile phone by them, but lacking knowledge to interact with latest apps such as Google Maps or Trip Advisor, which they think that’s complicated. Except the old fashion way of using a map, or asking others. What could they do?

Well, it’s time to introduce Nearbytes, a voiced based assistant that helps users to explore their surroundings with minimal effort.

## What it does

Nearbytes will ask for user’s location, and then recommend nearby facilities based on user’s requirements and conditions, helping users to decide where should they go.

## How we built it

- [Dasha](https://dasha.ai/)
  Nearbytes is a voiced-based communicative tool based on Dasha, an easy-to-implement conversational AI platform. It’s very convenient and developer friendly. Although we have no experience of using AI, we are still able to learn it quickly due to its friendly syntax and structured flow (kindly checkout the main.dsl).
- [Geoapify](https://www.geoapify.com/)
  We used the API service provided by geoapify. It acts as a prove of concept that dasha can be combined with other external API services to create more interesting application. They also provides some cool APIs besides from what we’ve used in this project. Be sure to check out them.
- [Nodejs](https://nodejs.org/en/)
  Nodejs is used to connect Dasha and Geoapify.

## Challenges we ran into

- Lack of experience
  Ryan and I are not very experienced in AI stuff, as you have already know. I thought it’ll be really hard when I was told that the hackathon is about AI stuff. I’m really amazed on how simple to use Dasha. I ran into some silly mistakes and really thanks for the help again provided by @Sreekaran from Dasha.
- Minimal resources of API
  It’ll be easy to just use a fully functional API by google (Google Maps API) but we do not choose it at last, as we think that it’ll be costly if we’re planning to let Nearbytes to be free to all users. Instead, we have chosen Geoapify as it provides a similar API services (that suits our needs for now) and its FREE.

## What we learned

- We’ve really learned a lot on Dasha and it really introduces a new way to communicate with the end user. We’re looking to implement it in our project afterwards.

## What's next for Nearbytes

- More and more facilities
  Not only restaurants, supermarket and hotel. We wish to make Nearbytes a tool for everyone to enjoy their trip without worrying the language barrier and internet connection.
- Filtering and finding details
  We hope to improve Nearbytes to suit for more detailed needs. For example, user will be able to find reviews provided by others, and also find the nearest sushi restaurant from them.

## How to start the app

1. Replace the API_KEY with your own api key from [Geoapify](https://myprojects.geoapify.com/projects)
2. Login to dasha account via `npx dasha account login`
3. Use `npm i` to install dependencies
4. Use `npm start <YOUR_PHONE_NUMBER>` to get a call from Dasha and try the app on your phone. You can also use `npm start chat` to interact with Dasha in your local console. (It might take a while before you can start communicating with Dasha first time as they're training the model.)
