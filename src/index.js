import "./styles.css";

// https://api.themoviedb.org/3/tv/top_rated?api_key=520586ec107ebeef4af3a185ee10ae9b&language=en-US&page=1

class App {
    state = { movies_type: "popular" };

    root = document.getElementById("app");
    modal = document.getElementById("modal_body");

    API_KEY = "520586ec107ebeef4af3a185ee10ae9b";
    URL_BASE = "https://api.themoviedb.org/3/";
    URL_PARAMS = `?language=en-US&api_key=${this.API_KEY}`;

    MOVIE_TYPES = {
        popular: {
            name: "Popular TV shows",
            url: `${this.URL_BASE}tv/popular${this.URL_PARAMS}`
        },
        rated: {
            name: "Top Rated TV shows",
            url: `${this.URL_BASE}tv/top_rated${this.URL_PARAMS}`
        }
    };

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
            .then(function(data) {
                // console.log(data);
                // res["data"] = data;
                app.home_page_render(data);
            })
            .catch(function(error) {
                // TODO: add caption on UI
                //alert(JSON.stringify(error));
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
            let movie_choice_row = document.createElement("div");

            const radio = document.createElement("input");
            radio.setAttribute("id", id);
            radio.setAttribute("type", "radio");
            radio.setAttribute("name", "radio_group_movie_type");
            radio.setAttribute("value", index);

            if (this.state.movies_type === index) {
                radio.setAttribute("checked", "checked");
            }
            movie_choice_row.appendChild(radio);

            radio.addEventListener("change", e => {
                //e.preventDefault();
                // console.log(index);
                this.state.movies_type = index;
                this.state.movie_page = 1;
                this.home_page_view();
            });

            const label = document.createElement("label");
            label.setAttribute("for", id);
            label.innerText = movie_type["name"];

            // radio.innerText = 'fddfgdfg';
            movie_choice_row.appendChild(label);
            this.root.appendChild(movie_choice_row);
        }

        this.root.appendChild(document.createElement("hr"));

        // movies
        for (let index in results) {
            let movie = results[index];
            const anchor = document.createElement("a");
            const li = document.createElement("li");
            anchor.setAttribute("href", "#");
            anchor.innerText = movie.name;

            // TODO: UGLY ???
            // let event_handler = this.handle_home_page_movie_click;
            anchor.addEventListener("click", e => {
                e.preventDefault();
                this.handle_home_page_movie_click({
                    event_page: "main_page_movie_click",
                    movie_type: this.state.movies_type,
                    object: movie
                });
                //this.handleMovie(this);
            });
            li.appendChild(anchor);
            this.root.appendChild(li);
        }

        // this.pagination_render(data, root_html);

        // pagination
        this.root.appendChild(document.createElement("hr"));
        this.render_pagination(root_id_element, data);
    }

    render_pagination(html_root, data) {
        // event_function
        function CreateButton(obj, text, data_page, enabled, ul_root) {
            let li = document.createElement("li");
            let href = document.createElement("a");
            href.innerText = text;
            href.setAttribute("href", "#");
            href.addEventListener("click", e => {
                obj.state.movie_page = data_page;
                obj.home_page_view();
            });

            li.appendChild(href);

            ul_root.appendChild(li);
            //return res;
        }

        let pagination_buttons = ["First", "Prior", "Next", "Last"];

        let pagination_row = document.createElement("div");
        pagination_row.setAttribute("class", "pagination_row");

        let ul_list = document.createElement("ul");

        for (let button in pagination_buttons) {
            let data_page = 3;
            let enabled = true;

            switch (button) {
                case "0":
                    data_page = 1;
                    enabled = data.total_pages > 0;
                    break;
                case "1":
                    data_page = data.page - 1;
                    enabled = data.page > 1;
                    break;
                case "2":
                    data_page = data.page + 1;
                    enabled = data.page < data.total_pages;
                    break;
                case "3":
                    data_page = data.total_pages;
                    enabled = data.total_pages > 0;
                    break;

                default:
            }

            if (!enabled) {
                continue;
            }

            CreateButton(
                this,
                pagination_buttons[button],
                data_page,
                enabled,
                ul_list
            );
        }

        pagination_row.appendChild(ul_list);

        this.root.appendChild(pagination_row);
        let page_info = document.createElement("p");
        page_info.innerText = `Page ${data.page} / ${data.total_pages}`;
        this.root.appendChild(page_info);
    }

    handle_home_page_movie_click(data) {
        // TODO: add all modal pages !
        console.log("modal !");

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
            poster: ${data.object["poster_path"]} <br>        
        `;

            // ???????????????
            // movie_url = `${this.URL_BASE}tv/popular`;
        }

        alert(res);
        this.modal.innerHTML = res;
        this.modal.style.display = "block";
        // document.getElementById("modal_body").innerHTML = res;

        //btn.onclick(data);
        return false;
    }
}

const app = new App();
app.main();
