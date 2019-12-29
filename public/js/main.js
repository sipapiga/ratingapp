$(document).ready(function () {

    axios
        .get('http://localhost:3000/index')
        .then(res => showRestaurang(res))
        .catch(err => console.error(err));

    function showRestaurang(res) {

        for (data of res.data) {
            document.getElementById('res').innerHTML += `
            <li class="lists" id="${data.id} ">
                <p class="image"><img src="${data.image}" width="150px"></p>
                    <div class="list-details">
                        <h3><a href="/restaurang/${data.id}"> ${data.name}</a></h3>
                        <p class=" lead"><strong>rating :</strong> ${data.rating}</p>
                        <div class="stars-outer">
                        <div class="stars-inner"></div>
                    </div>              
                    <span class="star" data-score= ${data.rating}></span>
                        <p class=" lead pt-2"><strong>Price :</strong> ${data.price}</p>
                        <p class=" lead"><strong>Category : </strong>${data.category}</p>
                    </div>
                    <div class="list-details  pl-5 ">
                        <p class="lead"><strong>Location : </strong>${data.location}</p>
                        <p class=" lead"><strong>Phone :</strong> ${data.phonenumber}</p>
                    </div>
                     <div class="listing-bottom align-bottom">
                        <button type="button" class="btn btn-info pointer" data-toggle="tooltip" data-placement="top" title="Please login to write a review." tabindex="-1" disabled>Write a Review</button>
                    </div> 
            </li>
            <hr>`;
        }
    }

    /*     const average = document.querySelectorAll('.star');
        console.log(average);
        let starPercentage = average.dataset.score * 10;
        starPercentageRounded = `${Math.round(starPercentage / 10) * 20}%`;
        document.querySelector('.stars-inner').style.width = starPercentageRounded; */

});