myApp.factory("HeroService", ["$http", function($http){
    var data = {};

    var postHero = function(data){
        $http.post("/hero", data).then(function(response){
            console.log("hero saved", response);
            getHeroes();
        });
    };

    var getHeroes = function(){
        $http.get("/hero").then(function(response){
            console.log("get heros", response.data);
            data.response = response.data;
        });
    };

    var dropHero = function(heroId){
        console.log("in factory", heroId.heroId);
        $http.delete("/hero/" + heroId.heroId).then(function(response){
        getHeroes();
    });
};

    return{
        dropHero : dropHero,
        postHero : postHero,
        getHeroes: getHeroes,
        data : data
    };
}]);
