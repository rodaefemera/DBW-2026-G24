'use strict';

$(document).ready(function() {
    const roomCategories = [
        {
            mode: "Casual",
            rooms: [
                { owner: "ProGamer", capacity: "2/8" },
                { owner: "xNoobSlayer", capacity: "5/8" },
                { owner: "xNoobSlayer", capacity: "5/8" },
                { owner: "xNoobSlayer", capacity: "5/8" },
                { owner: "xNoobSlayer", capacity: "5/8" },
                { owner: "xNoobSlayer", capacity: "5/8" },
                { owner: "xNoobSlayer", capacity: "5/8" },
                { owner: "xNoobSlayer", capacity: "5/8" },
                { owner: "xNoobSlayer", capacity: "5/8" },
                { owner: "GameMaster", capacity: "1/8" },
                { owner: "xNoobSlayer", capacity: "5/8" },
                { owner: "xNoobSlayer", capacity: "5/8" }
            ]
        },
        {
            mode: "Time Attack",
            rooms: [
                { owner: "SpeedKing", capacity: "3/8" },
                { owner: "FlashRunner", capacity: "6/8" }
            ]
        },
        {
            mode: "1st 2 3",
            rooms: []
        }
    ];

    roomCategories.forEach(category => {
        let roomListHTML = '';
        
        category.rooms.forEach(room => {
            roomListHTML += `
                <li>
                    <span>Room of: ${room.owner}</span>
                    <span>${room.capacity} Players</span>
                    <a href="#">[Join]</a>
                </li>
            `;
        });

        const cardHTML = `
            <div class="rooms-card">
                <h4>${category.mode}</h4>
                <hr>
                <ul>
                    ${roomListHTML}
                </ul>
            </div>
        `;

        $(cardHTML).appendTo('#rooms-list');
    });
});