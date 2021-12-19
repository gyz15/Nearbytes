context {
    input phone: string;
    userLoc:{lat:string;lon:string;name:string;}={lat:"",lon:"",name:""};
    results:{[x:string]:string;}[]=[];
}

// declare external functions here 
// external function confirm(fruit: string): boolean;
// external function status(): string;
external function findLoc(userLoc: string): {speech:string;lat:string;lon:string;};
external function findRestaurantInCity(userLat:string,userLon:string):{[x:string]:string;}[];
external function findSupermarketInCity(userLat:string,userLon:string):{[x:string]:string;}[];
external function findHotelInCity(userLat:string,userLon:string):{[x:string]:string;}[];
external function filterVegan(results:{[x:string]:string;}[]):{[x:string]:string;}[];
external function filterNoSeafood(results:{[x:string]:string;}[]):{[x:string]:string;}[];
external function recommend(resultArr:{[x:string]:string;}[]):
    {
        remainingRestaurant:{[x:string]:string;}[];
        hasOther:boolean;
        name:string;
        street:string;
        ratings:string;
        distance_away:string;
        ableToRecommend:boolean;
    };

start node root {
    do {
        #connectSafe($phone);
        #waitForSpeech(1000);
        #sayText("Thank you for visitng Nearbytes.");
        #sayText("I'm your artificially intelligent agent Dasha.");
        #sayText("I'm here to help you out. But before that, may I have your current location please?");
        wait *;
    }
    transitions {
        searchGeo: goto searchGeo on #messageHasData("city");
    }
}

node searchGeo{
    do{
        set $userLoc.name = #messageGetData("city", {value:true})[0]?.value??"";
        var cityResult = external findLoc($userLoc.name);
        set $userLoc.lat = cityResult.lat;
        set $userLoc.lon = cityResult.lon;
        #sayText(cityResult.speech);
        wait *;
    }
    transitions{
        confirmCity: goto offerHelp on #messageHasIntent("yes");
        denyCity: goto askCityAgn on #messageHasIntent("no");
        searchGeo: goto searchGeo on #messageHasData("city");
    }
}

node askCityAgn{
    do{
        #sayText("I'm sorry. Didn't catch what you say. Can you repeat again where are you at currently?");
        wait *;
    }
    transitions{
        searchGeo: goto searchGeo on #messageHasData("city");
    }
}

node offerHelp{
    do{
        #sayText("Okay, seems like you have confirmed your location. May I know what can I help you with?");
        #sayText("I'm good at finding some restaurant, hotel and supermarket near you");
        wait *;
    }
    transitions{
        searchRestaurant:goto restaurant on #messageHasIntent("restaurant");
        searchSuperMarket:goto supermarket on #messageHasIntent("supermarket");
        searchHotel:goto hotel on #messageHasIntent("hotel");
        bye:goto bye_then on #messageHasIntent("no");
    }
}

node restaurant{
    do{
        #sayText("Great! I will assist you to find your restaurant.");
        set $results = external findRestaurantInCity($userLoc.lat,$userLoc.lon);
        #sayText("Before I recommend some restaurant for you, do you have any special eating habits? Such as vegetarian or allergy to seafood.");
        wait *;
    }
    transitions{
        recommendRandom: goto recommendRandom on #messageHasIntent("no");
        recommendVegan: goto filterVegan on #messageHasIntent("vegan");
        recommendNoSeafood: goto filterNoSeafood on #messageHasIntent("noseafood");
    }
}

node supermarket{
    do{
        #sayText("Great! I will assist you to find a supermarket near you. Give me a second please.");
        set $results = external findSupermarketInCity($userLoc.lat,$userLoc.lon);
        goto recommendRandom;
    }
    transitions{
        recommendRandom:goto recommendRandom;
    }
}

node hotel{
    do{
        #sayText("Okay! I will help you find a hotel near you. Please wait for me while I'm searching it.");
        set $results = external findHotelInCity($userLoc.lat,$userLoc.lon);
        goto recommendRandom;
    }
    transitions{
        recommendRandom:goto recommendRandom;
    }
}

node recommendRandom{
    do{
        var recommendResult = external recommend($results);
        set $results = recommendResult.remainingRestaurant;
        if(recommendResult.ableToRecommend){
            #say("recommend",
                {
                    name:recommendResult.name,
                    street:recommendResult.street,
                    ratings:recommendResult.ratings,
                    distance_away:recommendResult.distance_away
                }
            );
            if(recommendResult.hasOther){
                #say("do_you_need_more");
                wait *;
            }else{
                #sayText("I'm sorry, this is all that I've found.");
                goto helpMore;
            }
        }else{
            #sayText("I'm sorry, I do not have any recommendations.");
        }
        exit;
    }
    transitions{
        recommendMore:goto recommendRandom on #messageHasIntent("yes");
        stopRecommend: goto helpMore on #messageHasIntent("no");
        helpMore:goto helpMore;
    }
}

node filterVegan{
    do{
        #sayText("Okay, I'll check see if there is any restaurant serving vegetarian or vegan food. Please give me a while.");
        set $results = external filterVegan($results);
        // #log($results);
        goto recommendVeganRestaurant;
    }
    transitions{
        recommendVeganRestaurant:goto recommendRandom;
    }
}

node filterNoSeafood{
    do{
        #sayText("Okay, I'll check see if there is any restaurant serving non-seafood dishes. Please give me a while.");
        set $results = external filterNoSeafood($results);
        goto recommendNoSeafoodRestaurant;
    }
    transitions{
        recommendNoSeafoodRestaurant:goto recommendRandom;
    }
}

node helpMore{
    do{
        #sayText("Is there anything else I can help you with?");
        wait *;
    }
    transitions{
        can_help:goto can_help on #messageHasIntent("yes");
        searchRestaurant:goto restaurant on #messageHasIntent("restaurant");
        searchSuperMarket:goto supermarket on #messageHasIntent("supermarket");
        searchHotel:goto hotel on #messageHasIntent("hotel");
        bye:goto bye_then on #messageHasIntent("no");
    }
}


node bye_then {
    do {
        #sayText("Thank you and I'll see you next time! ");
        exit;
    }
}


node can_help {
    do {
        #sayText("Right. How can I help you? ");
        wait*;
    }
    transitions{
        searchRestaurant:goto restaurant on #messageHasIntent("restaurant");
        searchSuperMarket:goto supermarket on #messageHasIntent("supermarket");
        searchHotel:goto hotel on #messageHasIntent("hotel");
        bye:goto bye_then on #messageHasIntent("no");
    }
}


digression bye  {
    conditions { on #messageHasIntent("bye"); }
    do {
        #sayText("Thank you and I'll see you next time!");
        exit;
    }
}




// additional digressions 
digression @wait {
    conditions { on #messageHasAnyIntent(digression.@wait.triggers)  priority 900; }
    var triggers = ["wait", "wait_for_another_person"];
    var responses: Phrases[] = ["i_will_wait"];
    do {
        for (var item in digression.@wait.responses) {
            #say(item, repeatMode: "ignore");
        }
        #waitingMode(duration: 70000);
        return;
    }
    transitions {
    }
}

digression repeat {
    conditions { on #messageHasIntent("repeat"); }
    do {
        #repeat();
        return;
    }
} 
