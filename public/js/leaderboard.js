"use strict";

const data = {
    time: [
        { name: "matriosca", score: 120 },
        { name: "dar123", score: 110 },
        { name: "JohnDoe", score: 95 },
        { name: "caidoceu", score: 94 },
        { name: "UsernameTeste", score: 10 },
        { name: "noob5", score: 5 },
        { name: "noob4", score: 5 },
        { name: "noob3", score: 4 },
        { name: "noob2", score: 2 },
        { name: "noob1", score: 1 }
    ],
    "123": [
        { name: "matriosca", score: 300 },
        { name: "JohnDoe", score: 250 },
        { name: "dar123", score: 200 }
    ]
};

function loadLeaderboard(mode) {
    const tbody = $("#leaderboard-body");
    let html = "";
    const list = data[mode];

    for (let i = 0; i < 51; i++) {
        const p = list[i] || { name: "", score: "" };

        html += `
            <tr>
                <td>#${i + 1}</td>
                <td>${p.name}</td>
                <td>${p.score}</td>
            </tr>
        `;
    }

    tbody.html(html);
}

function switchMode(mode) {
    const $wrapper = $(".lb-wrapper");
    const $tabs = $(".lb-tab");

    $wrapper.removeClass("active-time active-123");
    $tabs.removeClass("active");

    if (mode === "time") {
        $wrapper.addClass("active-time");
        $(".tab-time").addClass("active");
    } else {
        $wrapper.addClass("active-123");
        $(".tab-123").addClass("active");
    }

    loadLeaderboard(mode);
}

$(document).ready(function() {
    switchMode("time");
});