var friends = require("../data/friends.js");

module.exports = function(app){
	app.get("/api/friends", function(req, res){
		res.json(friends);
	});

	app.post("/api/friends", function(req, res){
		var lowestDifference = 50;
		var closestMatch;

		var newUser = {
			name: req.body.name,
			photo: req.body.photo,
			scores: req.body.scores
		};
		
		for(var i=0;i<friends.length;i++)
		{
			var totalDifference = 0;

			for(var j=0;j<friends[i].scores.length;j++)
			{
				totalDifference+=Math.abs(friends[i].scores[j]-newUser.scores[j]);
			}
			
			if(totalDifference<lowestDifference)
			{
				lowestDifference=totalDifference;
				closestMatch=friends[i];
			}
		}

		friends.push(newUser);

		res.json(closestMatch);
	});
}