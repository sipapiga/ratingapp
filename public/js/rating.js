$(document).ready(function () {
    const rate = document.querySelector('#rate');
    const review = document.querySelector('#review');
    const average = document.querySelector('#star');
    const averageUser = document.querySelectorAll('.star');
    let starPercentageRounded = 0;

    if (average !== null) {
        let starPercentage = average.dataset.score * 10;
        starPercentageRounded = `${Math.round(starPercentage / 10) * 20}%`;
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

        console.log(clickedValue)
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

        console.log(clickedValue)
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

        console.log(clickedValue)
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

        console.log(clickedValue)
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

        console.log(clickedValue)
    });


    if (rate !== null) {
        rate.addEventListener('click', function (event) {

            const reviewValue = review.value;
            const reviewer = document.querySelector('#reviewer').value;
            const id = document.querySelector('#id').value;
            console.log(reviewer);
            console.log(reviewValue);

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
                    url: 'http://localhost:3000/restaurang/review/' + id,
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

            console.log(reviewValue);
            event.preventDefault();
            setTimeout(function () {
                window.location.href = "http://localhost:3000/restaurang/" + id
            }, 1500);

        })
    }
});
