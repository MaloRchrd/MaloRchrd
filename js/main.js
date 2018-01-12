document.addEventListener("DOMContentLoaded", function(event) {

	console.log('fully coded in vanila cause why not 💻 ');
	console.log('📩 : malo.rchrd+pro@gmail.com');
	console.log('use "enter" to go to work 1,2,3 to swith filter and 0 for all');

	var work = document.getElementById('work');
	var presentation = document.getElementById('presentation');
	var tagline = document.getElementsByClassName('tagline');
	var social_icons = document.getElementsByClassName('social_icons');
	var description = document.getElementsByClassName('description');
	var profile = document.getElementById('profile');
	var close = document.getElementById('close');
	var name = document.getElementById('name');
	var portfolio = document.getElementById('portfolio');
	var filters = document.getElementById('filters');
	var wordpress = document.getElementById('wordpress');
	var ecommerce = document.getElementById('ecommerce');
	var javascript = document.getElementById('javascript');
	var contact = document.getElementById('contact');
	var envelope = document.getElementById('envelope');
	var send = document.getElementById('send');
	var success = document.getElementById('success');
	var main = document.getElementById('main');
	var airtable_write_endpoint = "https://api.airtable.com/v0/applTybfwLLcj5op7/contact?api_key=keyy91JVw4nn9lwqH";


	// Factory function to build cards

	var Card = function (website, i) {
		this.card = document.createElement('div');
		this.card.setAttribute('class','card animated fadeInUp');
		this.imgContainer = document.createElement('div');
		this.imgContainer.setAttribute('class','img_block');
		this.img = document.createElement('img');
		this.img.setAttribute('class','img_presentation');
		this.img.setAttribute('src','img/portfolio/'+website.imgName);
		this.img.setAttribute('alt', website.title);
		this.tagBlock = document.createElement('div');
		this.tagBlock.setAttribute('class','tags_block');
		this.tag = document.createElement('p');
		this.tag.setAttribute('class','tags');
		this.tag.innerHTML = '#'+ website.tag;
		this.title = document.createElement('h4');
		this.title.setAttribute('class','card_title');
		this.title.innerHTML = website.title;
		this.description = document.createElement('div');
		this.description.setAttribute('class','card_description');
		this.description.appendChild(this.title);
		this.description.innerHTML += website.description;
		this.linkTo = document.createElement('a');
		this.linkTo.setAttribute('href',website.url);
		this.linkTo.setAttribute('class','card_btn');
		this.linkTo.setAttribute('target','_blank');
		this.linkTo.innerHTML = 'Go to site';



		this.card.appendChild(this.imgContainer);
		this.imgContainer.appendChild(this.img);
		this.card.appendChild(this.tagBlock);
		this.tagBlock.appendChild(this.tag);
		this.card.appendChild(this.description);
		// this.description.prependChild(this.title);
		this.card.appendChild(this.linkTo);
		portfolio.appendChild(this.card);
		if (i%3 == 0) {
			this.clearfix = document.createElement('div');
			this.clearfix.setAttribute('class', 'clearfix')
			portfolio.appendChild(this.clearfix);
		}
	}


	var websiteJson = [
		{
		title:"HelloZack",
		imgName: "zack.png",
		description:"We buy 2nd hand apple product in a day. By analizing 2nd market we are able to offer you the right price for your porduct" ,
		tag:'javascript',
		url:'http://hellozack.fr/'
		},
		{
		title:"Sauvons notre peau",
		imgName: "snp.png",
		description:"Most of the cosmetics we use are made of chimical products & have side effect on your health. Learn about biological cosmetic. " ,
		tag:'wordpress',
		url:'http://www.sauvonsnotrepeau.fr/'
		},
		{
		title:"Switch up challenge",
		imgName: "suc.png",
		description:"Switch Up Challenge is a social entrepreneurship contest to help social tech startups to start & rise up. Organized by Makesense" ,
		tag:'wordpress',
		url:'http://switchupchallenge.com/'
		},
		{
		title:"Mon Job De Sens",
		imgName: "mjds.png",
		description:"In society we live in find the right job is difficult, Laura with her coaching session help you find your values and the job that is made for you " ,
		tag:'ecommerce',
		url:'http://monjobdesens.com'
		},
		{
		title:"Europe Tomorrow",
		imgName: "eut.png",
		description:"Hightlight and scale up the best social and environmental innovation across Europe" ,
		tag:'wordpress',
		url:'http://europetomorrow.org'
		},
		{
		title:"Robot Clope ",
		imgName: "to.png",
		description:"Robot Clope is a simple Facebook messenger bot that helps you find cigarets where ever you are in France this is a side project" ,
		tag:'javascript',
		url:'https://www.messenger.com/t/960621237397515'
		},
	]


	wordpress.addEventListener('click',function (e) {
		e.preventDefault();
		portfolio.innerHTML = "";
		createCards('wordpress');
	});

	ecommerce.addEventListener('click',function (e) {
		e.preventDefault();
		portfolio.innerHTML = "";
		createCards('ecommerce');
	});

	javascript.addEventListener('click',function (e) {
		e.preventDefault();
		portfolio.innerHTML = "";
		createCards('javascript');
	});


	// contact
	envelope.addEventListener('click',function (e) {
		e.preventDefault();
		contact.style.display='block';
		main.style.display='none';
	});

	send.addEventListener('click',function (e) {
		e.preventDefault();
		var inputName = document.getElementById('inputName').value;
		var inputEmail = document.getElementById('inputEmail').value;
		var inputMessage = document.getElementById('inputMessage').value;
		//<i class="fas fa-sync fa-spin"></i>
		send.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending';
		console.log(inputName,inputEmail,inputMessage);
		axios.post(airtable_write_endpoint ,  {
		    "fields": {
				"Name": inputName,
		        "email": inputEmail,
		        "message": inputMessage
			}
		}).then(function(response) {
		    // give it a little bit for data to hit AirTable
			console.log(response);
		    contact.style.display='none';
		    success.style.display='block';
			setTimeout(function () {
				success.style.display='none';
				main.style.display='block';
				send.innerHTML = 'Send';
			}, 1000);
		})


	});

	// open portfolio
	work.addEventListener('click',function (e) {
		e.preventDefault();
		createCards();
		presentation.className += " animated fadeOut";
		setTimeout(function () {
			tagline[0].style.display = "none";
			social_icons[0].style.display = "none";
			description[0].style.display = "none";
			work.style.display = "none";

		}, 600);

	 	setTimeout(function () {
			profile.className = " image_nav";
			name.className = "name_nav";
			close.style.display = "block";
			close.className = "close animated fadeIn";
			presentation.className = "animated fadeIn";
			portfolio.style.display = "block";
			filters.style.display = "block";
			portfolio.className = "animated fadeIn";
			filters.className = "animated fadeIn";
	 	}, 700);



	});

	// close portfolio
	close.addEventListener('click',function (e) {
		e.preventDefault();
		presentation.className = " animated fadeOut";
		filters.className = " animated fadeOut";
		portfolio.className = " animated fadeOut";
		close.className = "close animated fadeOut";
		setTimeout(function () {
			close.style.display = "none";
			profile.style.display = "none";
			name.style.display = "none";

			name.className = "name";
		}, 600);

		setTimeout(function () {
			tagline[0].style.display = "block";
			social_icons[0].style.display = "-webkit-inline-box";
			description[0].style.display = "block";
			close.style.display = "none";
			work.style.display = "unset";
			profile.className = "img_rounded animated fadeIn";
			name.className = "name animated fadeIn";
			profile.style.display = "unset";
			name.style.display = "unset";
			presentation.className = "animated fadeIn ";

		}, 700);
	});


	var createCards = function(tag) {
		if (tag) {
			for (var i = 0; i < websiteJson.length; i++) {
				if (websiteJson[i].tag == tag) {
					new Card(websiteJson[i], i+1);

				}
			}

		}else {
			for (var i = 0; i < websiteJson.length; i++) {
					new Card(websiteJson[i], i+1);
			}

		}

	}


	window.onkeydown = function(event){
    //   event.preventDefault();
      var code = event.keyCode;
      switch(code){
        case 27:
        event.preventDefault();
		presentation.className = " animated fadeOut";
		filters.className = " animated fadeOut";
		portfolio.className = " animated fadeOut";
		close.className = "close animated fadeOut";
		setTimeout(function () {
			close.style.display = "none";
			profile.style.display = "none";
			name.style.display = "none";
			name.className = "name";
		}, 600);

		setTimeout(function () {
			tagline[0].style.display = "block";
			social_icons[0].style.display = "-webkit-inline-box";
			description[0].style.display = "block";
			close.style.display = "none";
			work.style.display = "unset";
			profile.className = "img_rounded animated fadeIn";
			name.className = "name animated fadeIn";
			profile.style.display = "unset";
			name.style.display = "unset";
			presentation.className = "animated fadeIn ";

		}, 700);
        break;
        case 13:
		createCards();
		presentation.className += " animated fadeOut";
		setTimeout(function () {
			tagline[0].style.display = "none";
			social_icons[0].style.display = "none";
			description[0].style.display = "none";
			work.style.display = "none";

		}, 600);

	 	setTimeout(function () {
			profile.className = " image_nav";
			name.className = "name_nav";
			close.style.display = "block";
			close.className = "close animated fadeIn";
			presentation.className = "animated fadeIn";
			portfolio.style.display = "block";
			filters.style.display = "block";
			portfolio.className = "animated fadeIn";
			filters.className = "animated fadeIn";
	 	}, 700);

        break;
		case 49:
		portfolio.innerHTML = "";
		createCards('wordpress');
		break;
		case 50:
		portfolio.innerHTML = "";
		createCards('ecommerce');
		break;
		case 51:
		portfolio.innerHTML = "";
		createCards('javascript');
		break;
		case 48:
		portfolio.innerHTML = "";
		createCards();
		break;
      };
    };


// form






});
