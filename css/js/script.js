let pokemonRepository = (function(pokemon) {

    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
   
     let pokemonList = [];
   
    //1.8 =============================
       let modalContainer = document.querySelector('#modal-container');
       
       // REST OF CODE
       function showModalBootstrap(pokemon) {
       
           let mBody = $(".modal-body");
           let mTitle = $(".modal-title");
       
           mTitle.empty();
           mBody.empty();
       
           let nameElement = $('<h3>' + pokemon.name + '</h3>');
           let imageElement = $('<img class="pokemon-img">');
           imageElement.attr("src", pokemon.imageUrl);
           let heightElement = $('<p>' + 'Height: ' + pokemon.height + '</p>');
           let weightElement = $('<p>' + 'Weight: ' + pokemon.weight + '</p>');
           let typeElement = $('<p>' + 'Types: ' + pokemon.types + '</p>');
           let abilitiesElement = $('<p>' + 'Abilities: ' + pokemon.abilities + '</p>');
       
           mTitle.append(nameElement);
           mBody.append(imageElement);
           mBody.append(heightElement);
           mBody.append(weightElement);
           mBody.append(typeElement);
           mBody.append(abilitiesElement);
   
         let targetSelector = $(this).attr('data-target');
         $(targetSelector).modal('show'); // Bootstrap’s own function to make the modal appear
       } 
   
      function hideModal() {
       modalContainer.classList.remove('show-modal');
     }
   
     window.addEventListener('keydown', (e) => {
       if (e.key === 'Escape' && modalContainer.classList.contains('show-modal')) {
         hideModal();
         }
     });
     
       
   
     function hideModal() {
       let modalContainer = document.querySelector('#modal-container');
       modalContainer.classList.remove('is-visible');
     
     
     }
     
       
       window.addEventListener('keydown', (e) => {
         if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
           hideModal();  
         }
       });
       
       modalContainer.addEventListener('click', (e) => {
         // Since this is also triggered when clicking INSIDE the modal container,
         // We only want to close if the user clicks directly on the overlay
         let target = e.target;
         if (target === modalContainer) {
           hideModal();
         }
       });
     
     //1.7===================================
   
     function add(pokemon) {
        //console.log(pokemon);
       if (typeof pokemon == "object") {
         if ( ("name" in pokemon)&&
          ( "detailsUrl" in pokemon)) {
           pokemonList.push(pokemon);
          }
           
       }
     }
     function getAll() {
       return pokemonList;
     }
     function printDetails() {
       pokemonList.forEach(function(pokemon) {
         addListItem(pokemon);
       });
     }
   
     
     function addListItem(pokemon) {
       let tagul = document.querySelector('ul');
       let listItem = document.createElement('li');
       listItem.classList.add("group-list-item");
   
       let button = document.createElement('button');
       button.innerText = pokemon.name;
       button.addEventListener('click', function(){showDetails(pokemon);});
       button.classList.add("button-class");
       button.classList.add("btn");
       button.classList.add("btn-primary");
       button.setAttribute("data-toggle", "modal");
       button.setAttribute("data-target", "#pokemon-modal")
       $(button).addClass('button-class btn-block btn md');
       button.classList.add('button-class');
       listItem.appendChild(button);
       tagul.appendChild(listItem);
     }
   
   
   
   
     
     function loadList() {
       return fetch(apiUrl).then(function(response) {
         return response.json();
       }).then(function(json) {
         json.results.forEach(function(item) {
           let pokemon = {
             name: item.name,
             detailsUrl: item.url
           };
           //console.log(pokemon);
           add(pokemon);
           //addListItem(pokemon.name);
           
         });
       }).catch(function(e) {
         console.error(e);
       })
     }
     function loadDetails(item) {
       let url = item.detailsUrl;
       return fetch(url).then(function(response) {
         return response.json();
       }).then(function(details) {
         // Now we add the details to the item
         item.imageUrl = details.sprites.front_default;
         item.weight = details.weight;
         item.types = details.types.map((type) => type.type.name).join(', ');
         item.abilities = details.abilities.map((ability) => ability.ability.name).join(', ');
         //console.log(item.imageUrl);
       }).catch(function(e) {
         console.error(e);
       });
     }
   
   function loadDetails(item) {
       let url = item.detailsUrl;
       return fetch(url).then(function (response) {
         return response.json();
       }).then(function (details) {
         // now we add the details to the listItem
         item.imageUrl = details.sprites.front_default;
         item.height = details.height;
         item.weight = details.weight;
         item.types = details.types.map((type) => type.type.name).join(', ');
         item.abilities = details.abilities.map((ability) => ability.ability.name).join(', ');
       }).catch(function (e) {
         console.error(e);
       });
     }
   
     
     function showDetails(pokemon) {
       loadDetails(pokemon).then(function() {
       showModalBootstrap(pokemon);
       //showModalImage(pokemon.name, pokemon.name+", height: " + pokemon.height.toString(), pokemon.imageUrl);
         console.log(pokemon);
       });
     }
   
     
   
   
     return {
       add: add,
       getAll: getAll,
       showAll: printDetails,
       addListItem: addListItem,
       loadList: loadList,
       loadDetails: loadDetails,
       showDetails: showDetails
   
     };
   })();
   
   
   
   pokemonRepository.loadList().then(function() {
     pokemonRepository.showAll();
     pokemonRepository.getAll().forEach(function(pokemon) {
     });
   });
