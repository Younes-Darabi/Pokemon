function htmlPokemonListRender(i, list, listName) {
    return `
        <article onclick="showPokemondetailsInRight(${i},${listName}),showPokemondetailsInDialog(${i},${listName})" class="bg_${list[i].types[0]}">
            <div class="article_div">
                <div class="details_img">
                    <div class="title_number">
                        <h2>#${(list[i].id).toString().padStart(4, "0")}</h2>
                        <h3>${list[i].de}</h3>
                    </div>
                    <img class="article_img_list" src="${list[i].imageUrl}" alt="${list[i].name}"></img>
                </div>
                <div class="article_types">
                    <ul>${showPokemonTypes(i, list)}</ul>
                </div>
            </div>
        </article>
    `;
}

function htmlShowPokemondetailsInRight(i, list) {
    return `
        <div class="div_main">
            <img class="article_img" src="${list[i].imageUrl}" alt="${list[i].de}"></img>
            <h2 class="color_blackT text_align padding-5">#${list[i].id}</h2>
            <h3 class="color_black text_align padding-5">${list[i].de}</h3>
            <p class="pokemon_Story">${list[i].story}</p>
            <ul class="types">${showPokemonTypes(i, list)}</ul>
            <div class="weight_height">
                <h4>Gewicht</h4>
                <h4>${list[i].weight / 10} kg</h4>
            </div>
            <div class="weight_height">
                <h4>Körpergröße</h4>
                <h4>${list[i].height / 10} m</h4>
            </div>
            <div class="abilities">
                <h4>Fähigkeiten</h4>
                <ul>${showPokemonAbilities(i, list)}</ul>
            </div>
            <div class="stats">
                <h4>Statuswerte</h4>
                <div class="div_stats">${showPokemonStats(i, list)}</div>
            </div>
        </div>
    `;
}

function showPokemonStats(i, list) {
    return `
        <ul>
            <li class="kp">KP</li>
            <li>${list[i].stats[0]}</li>
        </ul>
        <ul>
            <li class="at">AT</li>
            <li>${list[i].stats[1]}</li>
        </ul>
        <ul>
            <li class="ve">VE</li>
            <li>${list[i].stats[2]}</li>
        </ul>
        <ul>
            <li class="sa">SA</li>
            <li>${list[i].stats[3]}</li>
        </ul>
        <ul>
            <li class="sd">SD</li>
            <li>${list[i].stats[4]}</li>
        </ul>
        <ul>
            <li class="ini">INI</li>
            <li>${list[i].stats[4]}</li>
        </ul>
    `;
}

function htmlBtnExitBackNext(i) {
    return ` 
    <div class="div_exit_back_next">
        <img class="exit" onclick="btnBack(${i})" src="assets/img/icons/back.png" alt="back">
        <img class="exit" onclick="exitDialog()" src="assets/img/icons/exit.png" alt="exit">
        <img class="exit" onclick="btnNext(${i})" src="assets/img/icons/next.png" alt="next">
    </div>
    `;
}

function htmlShowFilter(selectFilter){
    return `
        <div id="${selectFilter}" class="filter_name">
            <p>${selectFilter}</p>
            <img onclick="singleFilterDelete('${selectFilter}')" src="assets/img/icons/cross.png">
        </div>
    `;
}