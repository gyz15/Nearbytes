<p align = "center">
  <img width="507" alt="nearbyteswhitebg" src="https://user-images.githubusercontent.com/55860775/146695102-6c4ce60e-cb0f-42bf-9f32-b3ea1b51aebe.png">
</p>
## Inspiration

- Imagine you have just landed at an unfamiliar location, you haven’t bought any data plans yet. But looking for somewhere to stay before you continues a journey. What are you going to do if you’re not familiar with the new culture?
- As a Canadian (nuggetbucket54), many data plans may cover national calling while the data is limited to provinces. Being able to access information through national calling would be invaluable.
- Many tasks that seem easy for us may be difficult for others, such as the elderly. Their lacking knowledge of the latest apps such as Google Maps or Trip Advisor may limit their access to knowledge, but having a voice based assistant that is much more accessible and relatable could be very beneficial.

Well, introducing Nearbytes, a voiced based assistant that helps users to explore their surroundings with minimal effort.

## What it does

Nearbytes asks for user’s location, and then recommend nearby facilities based on user’s requirements and conditions, helping users to decide where should they go. Unlike other services, Nearbytes main attracting point is its ability to handle calls, meaning users do not need an internet connection, but just need to make a phone call.

## How we built it

- [Dasha](https://dasha.ai/)
  Nearbytes is a voiced-based communicative tool based on Dasha, an easy-to-implement conversational AI platform. It’s very convenient and developer friendly. Although we have no experience of using AI, we are still able to learn it quickly due to its friendly syntax and structured flow (kindly checkout the main.dsl).
- [Geoapify](https://www.geoapify.com/)
  We used the API service provided by geoapify. It acts as a prove of concept that dasha can be combined with other external API services to create more interesting application. They also provides some cool APIs besides from what we’ve used in this project. Be sure to check out them.
- [Nodejs](https://nodejs.org/en/)
  Nodejs is used to connect Dasha and Geoapify.

## Challenges we ran into

- Lack of experience
  Ryan and I were not very experienced in AI stuff, as you have already know. I thought it’ll be really hard when I was told that the hackathon is about AI stuff. I’m really amazed on how simple to use Dasha. I ran into some silly mistakes and really thanks for the help again provided by @Sreekaran from Dasha.
- Minimal resources of API
  It’ll be easy to just use a fully functional API by google (Google Maps API) but we do not choose it at last, as we think that it’ll be costly if we’re planning to let Nearbytes to be free to all users. Instead, we have chosen to use Geoapify as it provides similar API services (that suits our needs for now) while being FREE.

## What we learned

- We’ve really learned a lot on Dasha and it really introduces a new way to communicate with the end user. We’re looking to implement it in our future projects.

## What's next for Nearbytes

- More and more facilities
  We wish for Nearbytes to not be limited to only restaurants, supermarket and hotels. Nearbytes could be a tool for everyone to enjoy their trip without worrying about language barriers or internet connections.
- Filtering and finding details
  We hope to improve Nearbytes to suit for more detailed needs. For example, user will be able to find reviews provided by others, and also find the nearest sushi restaurant from them.
- Filtering and finding details
  Next, we are planning to develop a mobile user interface for a future app. Some mockups can be seen below:

<p align = "center">
  <img width="150" alt="Screen Shot 2021-12-19 at 2 39 09 PM" src="https://user-images.githubusercontent.com/55860775/146694934-6fc7aedc-6cbc-47a2-864a-d1589cc3458b.png"> <img width="154" alt="Screen Shot 2021-12-19 at 2 39 26 PM" src="https://user-images.githubusercontent.com/55860775/146694970-c1372bf2-781c-4756-b75e-3d523829fb45.png"> <img width="154" alt="Screen Shot 2021-12-19 at 2 39 51 PM" src="https://user-images.githubusercontent.com/55860775/146694975-a934e2a3-f34d-4fc1-bf9a-bc0888e8a0a4.png"> <img width="154" alt="Screen Shot 2021-12-19 at 2 40 03 PM" src="https://user-images.githubusercontent.com/55860775/146694983-a5580160-a4b7-402d-9fbc-96dbadc81018.png"> <img width="154" alt="Screen Shot 2021-12-19 at 2 40 17 PM" src="https://user-images.githubusercontent.com/55860775/146694984-192aa2e4-dee4-4139-a532-aeb1b3d5626c.png">
</p>

## How to start the app

1. Replace the API_KEY with your own api key from [Geoapify](https://myprojects.geoapify.com/projects)
2. Login to dasha account via `npx dasha account login`
3. Use `npm i` to install dependencies
4. Use `npm start <YOUR_PHONE_NUMBER>` to get a call from Dasha and try the app on your phone. You can also use `npm start chat` to interact with Dasha in your local console. (It might take a while before you can start communicating with Dasha for the first time as they're training the model.)
