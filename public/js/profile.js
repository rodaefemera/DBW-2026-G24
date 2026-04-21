'use strict';

$(document).ready(function() {
    const users = [
        { 
            name: "JohnDoe", 
            icon: "avatar1.png", 
            scores: { 
                casual: "1200 PTS",
                timeAttack: "3400 PTS",
                first23: "870 PTS"
            } 
        },
        { 
            name: "Maria", 
            icon: "MA", 
            scores: { 
                casual: "2000 PTS",
                timeAttack: "4000 PTS",
                first23: "1100 PTS"
            } 
        }
    ];

    const currentUser = users[0];
    const editIconMarkup = '<span class="profile-edit-icon">✎</span>';

    $('#profileName').html(`${currentUser.name} ${editIconMarkup}`);
    
    $('#scoreCasual').html(currentUser.scores.casual);
    $('#scoreTimeAttack').html(currentUser.scores.timeAttack);
    $('#scoreFirst23').html(currentUser.scores.first23);

    $('#profileIcon').attr('src', '../public/images/' + currentUser.icon);

    $(document).on('click', '.profile-edit-icon', function() {
        const newName = prompt("Enter new name:", currentUser.name);
        if (newName && newName.trim() !== "") {
            currentUser.name = newName.trim();
            $('#profileName').html(`${currentUser.name} ${editIconMarkup}`);
        }
    });
});