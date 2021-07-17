"use strict";

const DbService = require("moleculer-db");
const MongooseAdapter = require("moleculer-db-adapter-mongoose");
const User = require("../models/user.model");
const bcrypt= require('bcryptjs')
const jwt = require('jsonwebtoken')
module.exports = {

	name: "auth",
	mixins:[DbService],
	adapter:new MongooseAdapter('mongodb+srv://nitish:nitish@wildsprint.ksltt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'),
	model:User,
	/**
	 * Service settings
	 */
	settings: {
		fields:["_id","username","role","password"]
	},

	/**
	 * Service metadata
	 */
	metadata: {},

	/**
	 * Service dependencies
	 */
	dependencies: [],

	/**
	 * Actions
	 */
	 hooks: {
		before: {
			/**
			 * Register a before hook for the `create` action.
			 * It sets a default value for the quantity field.
			 *
			 * @param {Context} ctx
			 */
			create(ctx) {
				ctx.params.quantity = 0;
			}
		}
	},
	actions: {

		login:{
			rest :  "POST login",

			async handler(ctx,req,res) {
				console.log(ctx.params)
				const username = ctx.params.username;
				const password = ctx.params.password;
				
				return this.loginUser(username,password)
			}
		},

		signup:{
			rest :  "POST signup",
			async handler(ctx) {
				const username = ctx.params.username;
				const password = ctx.params.password;
				const role = ctx.params.role;
				return await this.addUser(username,password,role)
				
		}}
	},

	/**
	 * Events
	 */
	events: {

		"user.created"(payload){
			//payload.customer_id
			//payload.total
			this.logger.info("Something happened in order.created", payload);
			console.log(payload);
			//Check the customer credit_limit
						
		},
	},

	/**
	 * Methods
	 */
	methods: {
		async loginUser(username,password){
			let loadedUser;
			let user = await User.findOne({ username: username })
				console.log('FOUND UER?',user)
				if (!user) {
					const error = new Error('A user with this username could not be found.');
					error.statusCode = 401;
					return await Promise.reject(error);
			  	}
				  else{
					loadedUser = user;
						//console.log('comparing')
					console.log(await bcrypt.compare(password, user.password))
					if(await bcrypt.compare(password, user.password)===true){
						const token= jwt.sign({
							username: loadedUser.username,
							userId: loadedUser._id.toString() 
						},'teenagemutantninjaturtle',{expiresIn:'1h'});
						console.log(token)
						
						return await Promise.resolve({token:token, role:loadedUser.role, userId: loadedUser._id.toString()})
					}else{
							const error= new Error('Wrong Password');
							error.statusCode= 401;
							return await Promise.reject(error);
						}

					}
		},
		async addUser(username, password,role){
			let result_fin;
			let hashedPw = await bcrypt.hash(password, 12)
				const user = new User({
				password: hashedPw,
				username: username,
				role:role
				});
			let saved= await user.save()
			if(saved){
				console.log('Signed up user: ', saved);
				//res.status(201).json({ message: 'User created!', userId: result._id });
				return await Promise.resolve({ message: 'User created!', userId: saved._id })
				}else{
					const error= new Error('Unable to save!');
					error.statusCode= 401;
					return await Promise.reject(error);
				}	
			
			

		}

	},
	afterConnected(){
		console.log('Auth service connected')
	},
	/**
	 * Service created lifecycle event handler
	 */
	created() {
		console.log("Auth Service created");
	},

	/**
	 * Service started lifecycle event handler
	 */
	async started() {
		console.log("Auth Service started");
	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {

	}
};
