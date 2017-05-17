var chai = require('chai')
var chaiHttp = require('chai-http')
chai.use(chaiHttp)

const should = chai.should()
var server = require('../app')
var Blog = require('../models/blog')

describe('Blog', () => {
    var id = "";
    beforeEach((done) => {
        var newBlog = new Blog({
            'name': "ivan",
            'email': "ivanhabi2@gmail.com",
            'title': "How to play BlazBlue",
            'content': "CARNAGE SCICOR!"
        })

        newBlog.save((err, blog) => {
            id = blog._id
            done()
        })
    })

    afterEach((done) => {
        Blog.remove({}, (err) => {
            done()
        })
    })

    describe('GET - all Blog', () => {
        it('should get all data', (done) => {
            chai.request(server)
                .get('/blogs')
                .end((err, result) => {
                    result.should.have.status(200)
                    result.body.should.be.a('array')
                    result.body.length.should.equal(1)
                    done()
                })
        })
    })

    describe('POST - create blog', () => {
        it('should add a blog', (done) => {
            chai.request(server)
                .post('/blogs')
                .send({
                    'name': "ivan",
                    'email': "ivanhabi2@gmail.com",
                    'tittle': "How to play BlazBlue",
                    'content': "CARNAGE SCICOR!"

                })
                .end((err, result) => {
                    result.should.have.status(200)
                    result.body.should.be.a('object')
                    result.body.should.have.property('name')
                    result.body.should.have.property('email')
                    result.body.should.have.property('tittle')
                    result.body.should.have.property('content')
                    done()
                })
        })
    })



    describe('PUT - update blog', () => {
        it('should update a SINGLE blog', function(done) {
            chai.request(server)
                .get('/blogs')
                .end(function(err, res) {
                    chai.request(server)
                        .put('/blogs/' + res.body[0]._id)
                        .send({
                            'name': 'Spider'
                        })
                        .end(function(error, response) {
                            response.should.have.status(200);
                            response.should.be.json;
                            response.body.should.be.a('object');
                            response.body.should.have.property('name');
                            response.body.should.have.property('_id');
                            response.body.name.should.equal('Spider');
                            done();
                        });
                });
        });
    })
    describe('Delete - update blog', () => {
        it('should delete a SINGLE blog ', function(done) {
            chai.request(server)
                .get('/blogs')
                .end(function(err, res) {
                    chai.request(server)
                        .delete('/blogs/' + res.body[0]._id)
                        .end(function(error, response) {
                            response.should.have.status(200);
                            response.should.be.json;
                            response.body.should.be.a('object');
                            response.body.should.have.property('name');
                            response.body.should.have.property('_id');
                            response.body.name.should.equal('ivan');
                            done();
                        });
                });
        });
    })
})

describe('Blog validate', () => {
    var id = "";
    beforeEach((done) => {
        var newBlog = new Blog({
            'name': "ivan",
            'email': "ivanhabi2@",
            'title': "How to play BlazBlue",
            'content': "CARNAGE SCICOR!"
        })

        newBlog.save((err, blog) => {
            id = blog._id
            done()
        })
    })

    afterEach((done) => {
        Blog.remove({}, (err) => {
            done()
        })
    })

    describe('POST - create blog', () => {
        it('should add a blog', (done) => {
            chai.request(server)
                .post('/blogs')
                .send({
                    'name': "ivan",
                    'email': "ivanhbigmail.com",
                    'tittle': "How to play BlazBlue",
                    'content': "CARNAGE SCICOR!"
                })
                .end((err, result) => {
                    result.should.have.status(200)
                    result.body.should.be.a('object')
                    result.body.should.have.property('msg')
                    result.body.msg.should.have.equal('email ngaco')
                    done()
                })
        })
    })





})
