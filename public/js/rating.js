$(document).ready(function () {
    const rate = document.querySelector('#rate');
    const review = document.querySelector('#review');
    const average = document.querySelector('#star');

    let startotal = 5;
    let starPercentageRounded = 0;

    if (average !== null) {
        let starPercentage = (average.dataset.score / startotal) * 100;
        starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
        console.log(starPercentage);
        document.querySelector('.stars-inner').style.width = starPercentageRounded;
    }

    let clickedValue = 0;

    $('#1_star').click(function () {
        $('#1_star').css('color', 'orange');
        $('#2_star').css('color', 'black');
        $('#3_star').css('color', 'black');
        $('#4_star').css('color', 'black');
        $('#5_star').css('color', 'black');
        $('#showTitle').html('Bad');
    });
    $('#1_star').on('click', function () {
        clickedValue = 1;
    });

    $('#2_star').click(function () {
        $('#1_star').css('color', 'orange');
        $('#2_star').css('color', 'orange');
        $('#3_star').css('color', 'black');
        $('#4_star').css('color', 'black');
        $('#5_star').css('color', 'black');
        $('#showTitle').html('Poor');
    });

    $('#2_star').on('click', function () {
        clickedValue = 2;

    })
    $('#3_star').click(function () {
        $('#1_star').css('color', 'orange');
        $('#2_star').css('color', 'orange');
        $('#3_star').css('color', 'orange');
        $('#4_star').css('color', 'black');
        $('#5_star').css('color', 'black');
        $('#showTitle').html('Fair');
    });
    $('#3_star').on('click', function () {
        clickedValue = 3;
    })

    $('#4_star').click(function () {
        $('#1_star').css('color', 'orange');
        $('#2_star').css('color', 'orange');
        $('#3_star').css('color', 'orange');
        $('#4_star').css('color', 'orange');
        $('#5_star').css('color', 'black');
        $('#showTitle').html('Good');
    });
    $('#4_star').on('click', function () {
        clickedValue = 4;

    })

    $('#5_star').click(function () {
        $('#1_star').css('color', 'orange');
        $('#2_star').css('color', 'orange');
        $('#3_star').css('color', 'orange');
        $('#4_star').css('color', 'orange');
        $('#5_star').css('color', 'orange');
        $('#showTitle').html('Excellent');
    });
    $('#5_star').on('click', function () {
        clickedValue = 5;
    });


    if (rate !== null) {
        rate.addEventListener('click', function (event) {
            event.preventDefault();

            const reviewValue = review.value;
            const reviewer = document.querySelector('#reviewer').value;
            const id = document.querySelector('#id').value;

            let valid = true;

            if (clickedValue === 0 || clickedValue > 5) {
                valid = false;

                $('#error').html('<div class="alert alert-dnger">Please give a rating and review before you submit.</div>');
            } else {

                $('#error').html('');
            }

            if (valid === true) {

                axios({
                    method: 'post',
                    url: 'https://ratingsipr1901.herokuapp.com/reviews/' + id,
                    data: {
                        clickedValue: clickedValue,
                        sender: reviewer,
                        review: reviewValue
                    }
                })
                    .catch(err => console.error(err));

            } else {
                return false;
            }
            setTimeout(function () {
                window.location.href = "https://ratingsipr1901.herokuapp.com/reviews/restaurant/" + id
            }, 1500);

        })
    }
});
