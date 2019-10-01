import "./styles.css";

// https://api.themoviedb.org/3/tv/top_rated?api_key=520586ec107ebeef4af3a185ee10ae9b&language=en-US&page=1

class App {
    state = {movies_type: "popular"};

    constructor() {
        // TODO: Add @babel/plugin-proposal-class-properties (https://git.io/vb4SL) to the 'plugins' section of your Babel config to enable transformation.

        this.root = document.getElementById("app");

        this.API_KEY = "520586ec107ebeef4af3a185ee10ae9b";
        this.URL_BASE = "https://api.themoviedb.org/3/";
        this.URL_PARAMS = `?language=en-US&api_key=${this.API_KEY}`;

        this.MOVIE_TYPES = {
            popular: {
                name: "Popular TV shows",
                url: `${this.URL_BASE}tv/popular${this.URL_PARAMS}`
            },
            rated: {
                name: "Top Rated TV shows",
                url: `${this.URL_BASE}tv/top_rated${this.URL_PARAMS}`
            }
        };

        //this.state = {movies_type: "popular"};
    }

    removeElements(parent_element) {
        // clear html childrens
        while (parent_element.firstChild) {
            parent_element.removeChild(parent_element.firstChild);
        }
    }

    main() {
        this.home_page_view();
    }

    home_page_view(data) {
        let movie_url = this.MOVIE_TYPES[this.state.movies_type]["url"];
        // let res = {state: this.state};
        let aditional_params = this.state.movie_page
            ? `&page=${this.state.movie_page}`
            : "";

        let url = `${movie_url}${aditional_params}`;

        fetch(url)
            .then(resp => resp.json())
            .then(function (data) {
                console.log(data);
                // res["data"] = data;
                app.home_page_render(data, "app");
            })
            .catch(function (error) {
                console.log(JSON.stringify(error));
            });
    }

    home_page_render(data, root_id = undefined) {
        let root_id_element = this.root;
        if (root_id !== undefined) {
            root_id_element = root_id;
        }

        this.removeElements(this.root);

        let results = data["results"];
        let movies = "";

        // choice movie type Popular/Rated
        // TODO: check index hasOwnProprty ???
        for (let index in this.MOVIE_TYPES) {
            let movie_type = this.MOVIE_TYPES[index];

            let id = `radio-${index}-id`;
            var row = document.createElement('div');

            const radio = document.createElement("input");
            radio.setAttribute('id', id);
            radio.setAttribute('type', 'radio');
            radio.setAttribute('name', 'radio_group_movie_type');
            radio.setAttribute('value', index);

            if (this.state.movies_type === index){
                radio.setAttribute('checked', 'checked');
            }
            row.appendChild(radio);

            radio.addEventListener('change', (e) => {
                //e.preventDefault();
                console.log(index);
                this.state.movie_type = index;
                this.home_page_view();
            });


            const label = document.createElement('label');
            label.setAttribute('for', id);
            label.innerText = movie_type["name"];

            // radio.innerText = 'fddfgdfg';
            row.appendChild(label);
            this.root.appendChild(row);
        }

        // this.pagination_render(data, root_html);

        // pagination
        let pagination = {
            page: data["page"],
            total_results: data["total_results"],
            total_pages: data["total_pages"]
        };


        // movies
        for (let index in results) {
            let movie = results[index];
            const anchor = document.createElement("a");
            const li = document.createElement("li");
            anchor.setAttribute("href", "#");
            anchor.innerText = movie.name;

            // TODO: UGLY ???
            // let event_handler = this.handle_home_page_movie_click;
            anchor.addEventListener("click", (e) => {
                e.preventDefault();
                this.handle_home_page_movie_click({
                    event_page: 'main_page_movie_click',
                    movie_type: this.state.movies_type,
                    object: movie
                });
                //this.handleMovie(this);
            });
            li.appendChild(anchor);
            this.root.appendChild(li);
        }

        let res = `
    ${this.movie_type_view(data.state.movies_type)}

    <ul>
        ${movies}        
    </ul>
  
    <div class="pagination">
        <ul >
            ${this.render_pagination(pagination)}
        </ul>
    </div>
    `;

        //document.getElementById("app").innerHTML = res;
    }

    // ************************* Movie Type Selector ***************************************
    movie_type_view(active_movie_type) {
        // let res = '';

        let res = "";

        let res2 = "";

        //    res2 = radioInput;

        for (let index in this.MOVIE_TYPES) {
            let mtype = this.MOVIE_TYPES[index];
            let active = "";

            let radioInput = document.createElement("input");
            radioInput.setAttribute("type", "radio");
            radioInput.setAttribute("name", "movie_type");

            if (active_movie_type === index) {
                radioInput.setAttribute("checked", "checked");
            }

            radioInput.addEventListener("onchange", this.handleRadioChange);

            res2 += radioInput;
        }

        for (let index in this.MOVIE_TYPES) {
            let mtype = this.MOVIE_TYPES[index];
            let active = "";
            if (active_movie_type === index) {
                active = 'checked="checked"';
            }

            res += `<label><input class="movie_type_radio" type="radio" name="movie_type" value="${index}" onchange="app.handleMovieTypeClick(this, event)" ${active}>
                    ${mtype.name}
                </label>`;
        }

        res = `
    <div>
 
    <form id="select_movie_type" action="" method="post">
        <fieldset> <legend><b>Movie type:</b></legend>
        ${res}
        </fieldset>
        </form>
    </div>
    `;

        return res2;
    }

    handleRadioChange(obj, e) {
        // let movie_type = obj.value;
        this.state["movies_type"] = obj.value;
        this.state.movie_page = 1;
        this.home_render();
    }

    // ************************* Movie Type Selector ***************************************

    render_pagination(data) {
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


    handle_home_page_movie_click(data) {
        // TODO: add all modal pages !
        let aditional_params = "";
        // let activity_page = data.activity_page;

        // let e = data.object.getAttribute('data-name');
        // TODO: poster fix ?

        let res = "";
        let movie_url = "";

        if (data.event_page === "main_page_movie_click") {
            res = `
            id: ${data.object.id} <br>
            name: ${data.object.name} <br><br>
            overview: ${data.object.overview} <br><br>
            poster: ${data.object['poster_path']} <br>        
        `;

            // ???????????????
            // movie_url = `${this.URL_BASE}tv/popular`;
        }

        document.getElementById("modal_body").innerHTML = res;

        btn.onclick(data);
        return false;
    }


}

const app = new App();
app.main();
