"use strict";
const User = require("../models/user.model");
const ApiGateway = require("moleculer-web");
const E = ApiGateway.Errors
const bcrypt= require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
	name: "ip",
	mixins: [ApiGateway],

	settings: {
		port: process.env.PORT || 3000,
		ip: "0.0.0.0",

		use: [],

		routes: [
			{
				path: "/ip",

				whitelist: [
					"auth.login",
					"auth.signup"
				],
				
				use: [],

				mergeParams: true,

				authentication: false,

				authorization: false,

				autoAliases: true,

				aliases: {
					
				},

				callingOptions: {},

				bodyParsers: {
					json: {
						strict: false,
						limit: "1MB"
					},
					urlencoded: {
						extended: true,
						limit: "1MB"
					}
				},

				mappingPolicy: "all", // Available values: "all", "restrict"

				logging: true,
				
			},
			{
				path: "/ip",

				whitelist: [
					"webhook.register",
					"webhook.update",
					"webhook.delete",
					"webhook.list",
				],
				
				use: [],

				mergeParams: true,

				authentication: true,

				authorization: false,

				autoAliases: true,

				aliases: {
					
				},

				callingOptions: {},

				bodyParsers: {
					json: {
						strict: false,
						limit: "1MB"
					},
					urlencoded: {
						extended: true,
						limit: "1MB"
					}
				},

				mappingPolicy: "all", // Available values: "all", "restrict"

				logging: true,
				
			}
		],

		log4XXResponses: false,
		logRequestParams: null,
		logResponseData: null,


		assets: {
			folder: "public",
			options: {}
		}
	},

	methods: {

		
		async authenticate(ctx, route, req) {
			const authHeader = req.headers["authorization"];
			if (!authHeader) {
				const error = new Error('Not authenticated.');
				error.statusCode = 401;
				throw error;
			}
			const token = authHeader.split(' ')[1];
			let decodedToken;
			try {
				decodedToken = jwt.verify(token, 'teenagemutantninjaturtle');
			} catch (err) {
				err.statusCode = 500;
				throw (err);
			}
			if (!decodedToken) {
				const error = new Error('Not authenticated.');
				error.statusCode = 401;
				throw (error);
			}
			let userId = decodedToken.userId;
			let user = await User.findById(userId)
			if(user && user.role!='admin'){
				const error = new Error('Not Admin!.');
				error.statusCode = 401;
				throw (error);
			}
		}

	}
};
