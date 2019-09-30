// import "./styles.css";
// import './themoviedb';
// import './utils';

document.getElementById("app").innerHTML = `<h1>Please wait, loading...</h1><div></div>`;

// https://api.themoviedb.org/3/tv/top_rated?api_key=520586ec107ebeef4af3a185ee10ae9b&language=en-US&page=1

const BASE_URL = 'https://api.themoviedb.org/3/';

const MOVIE_TYPES = {
    popular: {
        name: 'Popular TV shows',
        url: `${BASE_URL}tv/popular`
    },
    rated: {
        name: 'Top Rated TV shows',
        url: `${BASE_URL}tv/top_rated`
    }
};

var state = {};

// *********************************** APP The Movie DB ****************************************
// var movie = {};
class app_themoviedb {
    API_KEY = '';
    base_url = '';

    constructor(API_KEY) {
        this.API_KEY = API_KEY;
        // this.base_url = `https://api.themoviedb.org/3/tv/top_rated?language=en-US&api_key=${API_KEY}`;
    }

    query(param) {
        // let res = `https://api.themoviedb.org/3/tv/top_rated?language=en-US&api_key=${API_KEY}`;
        let res = `https://api.themoviedb.org/3/tv/top_rated?language=en-US&api_key=${API_KEY}`;
        console.log(res);
        return res;
    }


    getPopularTVshows() {
    }

    getTopRatedTVshows() {
    }
}

// *********************************** APP The Movie DB ****************************************


// ****************************************     Utils   ********************************
// class ajax {
//     onBeforeSend = undefined;
//     onError = undefined;
//
//     on
// }

function ajax(api_url, aditional_params, onError = undefined, onDone = undefined) {
    const API_KEY = '520586ec107ebeef4af3a185ee10ae9b';

    var res = undefined;
    var data = "{}";
    var query_params = `?language=en-US&api_key=${API_KEY}`;
    if (aditional_params) {
        query_params += aditional_params;
    }

    var url = `${api_url}${query_params}`;
    var xhr = new XMLHttpRequest();
    // xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            res = this.responseText;
            // console.log(this.responseText);
            // document.getElementById("app").innerHTML = res['page'];
            if (onDone) {
                onDone(JSON.parse(this.responseText));
            }
        }
    });

    // TODO: refactor CORS

    xhr.onerror = onError;
    // xhr.onloadend = onDone;
    xhr.open("GET", url);

    // xhr.open("GET", `https://api.themoviedb.org/3/tv/top_rated${query_params}`);


    // xhr.open("GET", `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Ponyo&year=2008`);
    // xhr.open("GET", `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${API_KEY}`);

    xhr.setRequestHeader("Origin", "*");
    // xhr.setRequestHeader("Origin", location.origin);
    // xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.setRequestHeader("Content-Type", "application/json");
    // xhr.setRequestHeader("Accept", "application/json");
    // xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    // xhr.setRequestHeader("Access-Control-Allow-Headers", "*");
    // xhr.setRequestHeader("Access-Control-Allow-Credentials", "true");
    // xhr.setRequestHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    // xhr.setRequestHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    // xhr.setRequestHeader('Access-Control-Allow-Headers', '*');
    // xhr.setRequestHeader('Content-type', 'application/ecmascript');
    // xhr.setRequestHeader('Access-Control-Allow-Origin', '*');


    xhr.send(data);
}

// ****************************************     Utils   ********************************

// ************************* Movie Type Selector ***************************************
function movie_type_view(active_movie_type) {
    // var res = '';

    var res = '';

    for (let index in MOVIE_TYPES) {
        let mtype = MOVIE_TYPES[index];
        let active = '';
        if (active_movie_type === index) {
            active = 'checked="checked"'
        }


        res += `<label><input class="movie_type_radio" type="radio" name="movie_type" value="${index}" onchange="handleMovieTypeClick(this);" ${active}>
                    ${mtype.name}
                </label>`;
    }

    res = `
    <div>
 
    <form id="select_movie_type" action="" method="post">
        <fieldset> <legend><b>Movie type:</b></legend>
        ${res}
<!--        <label><input type="radio" name="movie_type" value="popular" checked="checked">Popular TV shows</label>-->
<!--        <label><input type="radio" name="movie_type" value="rated">Top Rated TV shows</label>-->
        </fieldset>
<!--        <p><input type="reset"> <input type="submit"></p>-->
        </form>
    </div>
    `;

    return res;
}

function handleMovieTypeClick(obj) {
    // let movie_type = obj.value;
    state['movies_type'] = obj.value;
    state.movie_page = 1;
    home_view();
}

// ************************* Movie Type Selector ***************************************

function render_pagination(data) {
    let handler = `href="#" onclick="return handleMoviePage(this)"`;

    let res = `<li><a ${handler} data-page="1">First</a></li>`;

    if (data.page - 1 > 1) {
        res += `<li><a ${handler} data-page="${data.page - 1}">Prior</a></li>`;
    }


    if (data.page + 1 < data.total_pages) {
        res += `<li><a ${handler} data-page="${data.page + 1}">Next</a></li>`;
    }

    res += `<li><a ${handler} data-page="${data.total_pages}">Last</a></li>

    <br>
    page: ${data.page}
    <br>
    total pages: ${data.total_pages}`;
    return res;
}

function home_view(data) {
    let movie_url = MOVIE_TYPES[state.movies_type]['url'];
    let res = {'state': state};

    let aditional_params = '';

    if (state.movie_page) {
        aditional_params = `&page=${state.movie_page}`
    }


    ajax(
        movie_url,
        aditional_params,
        onError = function () {
            alert('Ajax error!');
        },

        onDone = function (data) {
            res['data'] = data;
            // home_view(data);
            home_render(res);
        }
    );

}

function handleMoviePage(obj) {
    // e.preventDefault();
    // e.preventDefault();
    // var href = obj.attr("href");
    state.movie_page = obj.getAttribute('data-page');

    home_view();
    return false;
}


function home_render(data, root_id = undefined) {

    let root_id_element = 'app';
    if (root_id !== undefined) {
        root_id_element = root_id;
    }

    document.getElementById(root_id_element).innerHTML = '';

    let handler = `onclick="handleMovie(this);return false;"`;

    let res = '';
    // alert('Ajax done 3!');
    // res = `Done !!!! Loaded: ${data['total_results']}`;


    let results = data.data['results'];
    let movies = '';

    let pagination = {
        page: data.data['page'],
        total_results: data.data['total_results'],
        total_pages: data.data['total_pages']
    };

    for (let index in results) {
        let movie = results[index];
        movies += `<li><a href="#" 
            data-type="${data.state.movies_type}" 
            data-id="${movie.id}" 
            data-name="${movie.name}"
            data-overview="${movie.overview}"
            
            data-poster="${movie.poster_path}"
               
            ${handler}>${movie.name}</a></li>`;
    }


    res = `
    ${movie_type_view(data.state.movies_type)}

    <ul>
        ${movies}        
    </ul>
  
    <div class="pagination">
        <ul >
            ${render_pagination(pagination)}
        </ul>
    </div>
    `;

    // res += `
    // <div id="movie_details">
    // </div>
    //
    // <div id="movie_details">
    // </div>
    //
    // <div id="movie_details">
    // </div>
    // `;

    document.getElementById("app").innerHTML = res;
}

function modal_view(data) {
    let aditional_params = '';
    // let activity_page = data.activity_page;

    // var e = data.object.getAttribute('data-name');
    // TODO: poster fix ?

    let res = '';
    let movie_url = '';

    if (data.activity_page === 'handleMovie') {
        res = `
            id: ${data.object.getAttribute('data-id')} <br>
            name: ${data.object.getAttribute('data-name')} <br><br>
            overview: ${data.object.getAttribute('data-overview')} <br><br>
            poster: ${data.object.getAttribute('data-poster')} <br>        
        `;

        // ???????????????
        movie_url = `${BASE_URL}tv/popular`;


    }


    document.getElementById("modal_body").innerHTML = res;

    btn.onclick(data);
    return false;

    ajax(
        movie_url,
        aditional_params,
        onError = function () {
            alert('Ajax error!');
        },

        onDone = function (data) {
            res['data'] = data;
            // home_view(data);
            home_render(res);
        }
    );

    // ren

    // ajax(
    //     movie_url,
    //     aditional_params,
    //     onError = function () {
    //         alert('Ajax error!');
    //     },
    //
    //     onDone = function (data) {
    //         res['data'] = data;
    //         // home_view(data);
    //         home_render(res);
    //     }
    // );


}


function handleMovie(obj) {

    // По кліку на конкретний елемент списку, потрібно показати заголовок, опис, постер, кількість сезонів, кількість епізодів і список сезонів даного TV show.
    // btn.onclick(obj);

    let res = {
        activity_page: 'handleMovie',
        object: obj,
    };

    modal_view(res);

}

function path(routher, view, name) {
    return {
        'routher': routher,
        'view': view,
        'name': name
    };
}

// let url = [
//     path('', view = home_view(), name = 'home'),
// ];


// movie.init(){}


function setInitialState(data) {
    state = data;
}

function main() {
    setInitialState({
        'movies_type': 'popular',
    });


    // routhing
    home_view();

    // var app = new app_themoviedb();
    // console.log(app.query('ffdg'));


}

main();


//document.getElementById("app").innerHTML = ajax();
