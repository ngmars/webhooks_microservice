"use strict";
const DbService = require("moleculer-db");
const MongooseAdapter = require("moleculer-db-adapter-mongoose");
const Webhooks = require("../models/webhooks.model");
const bcrypt= require('bcryptjs')
const jwt = require('jsonwebtoken')
module.exports = {

	name: "webhook",
	mixins:[DbService],
	adapter:new MongooseAdapter('mongodb+srv://nitish:nitish@wildsprint.ksltt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'),
	model:Webhooks,

	/**
	 * Service settings
	 */
	 settings: {
		fields:["_id","webhook"]
	},

	/**
	 * Service metadata
	 */
	metadata: {},

	/**
	 * Service dependencies
	 */
	dependencies: [],

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
		
		register:{
			rest :  "POST webhook",

			async handler(ctx,req,res) {
				console.log(ctx.params)
				const webhook = ctx.params.targetUrl;
				return this.addWebhook(webhook)
			}
		},
		
		update:{
			rest :  "PUT webhook",

			async handler(ctx,req,res) {
				console.log(ctx.params)
				const id = ctx.params.id;
				const webhook = ctx.params.newTargetUrl;
				return this.updateWebhook(id,webhook)
			}
		},

		delete:{
			rest :  "DELETE webhook",

			async handler(ctx,req,res) {
				console.log(ctx.params)
				const id = ctx.params.id;
				return this.deleteWebhook(id)
			}
		},
		list:{
			rest :  "GET webhook",

			async handler(ctx,req,res) {
				return this.getAllWebhook()
			}
		}

	},

	/**
	 * Events
	 */
	events: {
		async "some.thing"(ctx) {
			this.logger.info("Something happened", ctx.params);
		}
	},

	/**
	 * Methods
	 */
	methods: {
		async addWebhook(webhook){
			const newWebhook = new Webhooks({
				webhook:webhook
			})
			let saved= await newWebhook.save()
			if(saved){
				return await Promise.resolve({"Your_webhook":saved.webhook,_id:saved._id})
			}else{
				const error= new Error('Unable to save!');
				error.statusCode= 401;
				return await Promise.reject(error);
			}
		},

		async updateWebhook(id,webhook){
			//To update webhook by id in mongodb
			let foundWebhook = await Webhooks.findOne({_id:id})
			if(foundWebhook){
				foundWebhook.webhook = webhook
				let saved = await foundWebhook.save()
				if(saved){
					return await Promise.resolve({"Your_updated_webhook":saved.webhook,_id:saved._id})
				}else{
					const error= new Error('Unable to save!');
					error.statusCode= 401;
					return await Promise.reject(error);
				}
			}else{
				const error= new Error('Id not found!');
				error.statusCode= 401;
				return await Promise.reject(error);
			}
		},
		async deleteWebhook(id){
			let saved= await Webhooks.findByIdAndRemove(id)
			if(saved){
				return await Promise.resolve("Your_webhook has been deleted successfully!")
			}else{
				const error= new Error('Unable to delete!');
				error.statusCode= 401;
				return await Promise.reject(error);
			}
		},
		async getAllWebhook(){
			let foundWebhook = await Webhooks.find({})
			if(foundWebhook){
				return await Promise.resolve(foundWebhook)
			}else{
				const error= new Error('Unable to find!');
				error.statusCode= 401;
				return await Promise.reject(error);
			}
		}
	},

	/**
	 * Service created lifecycle event handler
	 */
	created() {
		console.log('Webhook service created')
	},

	/**
	 * Service started lifecycle event handler
	 */
	async started() {
		console.log('Webhook service started')
	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {
		console.log('Webhook service stopped')
	}
};
