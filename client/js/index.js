Vue.component('kepala', {
    template: ` <nav id='main'>
    <div class="nav-wrapper">
      <a href="#" class="brand-logo" v-on:click="openNav()" ><i class="material-icons">reorder</i></a>
    </div>
  </nav>`,
    data() {
        return {}
    },
    methods: {
        openNav() {
            document.getElementById("mySidenav").style.width = "250px";
            document.getElementById("main").style.marginLeft = "250px";

        }
    }
});

Vue.component('badan', {
    props: ['contentdata'],
    template: `<p>{{contentdata}}</p>`,
    data() {
        return {}
    },
    methods: {

    }
});


Vue.component('sidebar', {
    props: ['test'],
    template: `
  <div id="mySidenav" class="sidenav">
    <a href="javascript:void(0)" class="closebtn" v-on:click="closeNav()">&times;</a>
    <a href="javascript:void(0)" @click="choosecontent(list.content)" v-for='list in test' >{{list.tittle}}</a>
  </div>`,
    data() {
        return {}
    },
    methods: {
        choosecontent: function(content) {
            alert('ngek')
            var self = this
            self.$emit('choosecontent', content)
        },
        closeNav() {
            document.getElementById("mySidenav").style.width = "0";
            document.getElementById("main").style.marginLeft = "0";
        }
    }
});





var app = new Vue({
    el: '#app',
    data: {
        listBlogs: [],
        test: 'tai',
        content: ''
    },
    methods: {
        generateBlog: function() {
            var self = this
            axios.get('http://localhost:3000/blogs/', {}).then(function(response) {
                self.listBlogs = response.data
                console.log(self.listBlogs);
            })

        },
        choosecontentp: function(content) {
            var self = this
            self.content = content
            console.log(self.content);
        }
    },
    created: function() {
        this.generateBlog()
    }





})
