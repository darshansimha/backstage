/*! For license information please see 82d3d01b.8e8d9b93.js.LICENSE.txt */
"use strict";(self.webpackChunkbackstage_microsite=self.webpackChunkbackstage_microsite||[]).push([[273219],{149487:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>d,frontMatter:()=>a,metadata:()=>s,toc:()=>l});var r=n(824246),i=n(511151);const a={id:"auth-service-migration",title:"Migrating to New Auth Services",description:"A guide for how to migrate Backstage backend plugins and modules to use the new auth services"},o=void 0,s={id:"tutorials/auth-service-migration",title:"Migrating to New Auth Services",description:"A guide for how to migrate Backstage backend plugins and modules to use the new auth services",source:"@site/../docs/tutorials/auth-service-migration.md",sourceDirName:"tutorials",slug:"/tutorials/auth-service-migration",permalink:"/docs/tutorials/auth-service-migration",draft:!1,unlisted:!1,editUrl:"https://github.com/backstage/backstage/edit/master/docs/../docs/tutorials/auth-service-migration.md",tags:[],version:"current",frontMatter:{id:"auth-service-migration",title:"Migrating to New Auth Services",description:"A guide for how to migrate Backstage backend plugins and modules to use the new auth services"},sidebar:"docs",previous:{title:"Migrating from Material UI v4 to v5",permalink:"/docs/tutorials/migrate-to-mui5"},next:{title:"Setup OpenTelemetry",permalink:"/docs/tutorials/setup-opentelemetry"}},c={},l=[{value:"Backend migration",id:"backend-migration",level:2},{value:"Disabling the default auth policy",id:"disabling-the-default-auth-policy",level:3},{value:"Migrating the backend",id:"migrating-the-backend",level:3},{value:"Plugin &amp; Module migration",id:"plugin--module-migration",level:2},{value:"Adding auth policies",id:"adding-auth-policies",level:3},{value:"Using the new auth services",id:"using-the-new-auth-services",level:3},{value:"Updating dependencies in the new backend system",id:"updating-dependencies-in-the-new-backend-system",level:4},{value:"Making the new auth services available in <code>createRouter</code>",id:"making-the-new-auth-services-available-in-createrouter",level:4},{value:"Replacing old auth service calls",id:"replacing-old-auth-service-calls",level:4},{value:"Example 1: Making a standalone service-to-service request",id:"example-1-making-a-standalone-service-to-service-request",level:5},{value:"Example 2: Forwarding credentials from an incoming request",id:"example-2-forwarding-credentials-from-an-incoming-request",level:5},{value:"Example 3: Getting the user identity from a request",id:"example-3-getting-the-user-identity-from-a-request",level:5}];function u(e){const t={a:"a",code:"code",em:"em",h2:"h2",h3:"h3",h4:"h4",h5:"h5",p:"p",pre:"pre",strong:"strong",...(0,i.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(t.p,{children:["The auth services for the Backstage backend system have been reworked in the 1.24 release. Among other improvements, this brings protection by default for Backstage backends, replacing the ",(0,r.jsx)(t.a,{href:"https://github.com/backstage/backstage/blob/9aac2b0d36bdb8095ea747fe5e5490cfea1c9f16/contrib/docs/tutorials/authenticate-api-requests.md",children:"authenticate-api-requests.md"})," guide in contrib. This guide will help you migrate your existing backend setup as well as backend ",(0,r.jsx)(t.em,{children:"plugins and modules"})," to use the new auth services."]}),"\n",(0,r.jsxs)(t.p,{children:["The change with the most impact that accompanies the new auth services is the default behavior of all plugins running in the new backend system to block all requests that are not authenticated as a user or service, also known as the ",(0,r.jsx)(t.em,{children:"default auth policy"}),". This is the only breaking production change introduced as part of this update, and may require action to be taken on both backend installations and plugins. More on that in the individual sections below."]}),"\n",(0,r.jsx)(t.h2,{id:"backend-migration",children:"Backend migration"}),"\n",(0,r.jsxs)(t.p,{children:["In order to use these new services your backend needs to be using the ",(0,r.jsx)(t.a,{href:"/docs/backend-system/building-backends/index",children:"new backend system"}),". If your backend is running the old system, you will need to ",(0,r.jsx)(t.a,{href:"/docs/backend-system/building-backends/migrating",children:"migrate it to the new system first"}),"."]}),"\n",(0,r.jsxs)(t.p,{children:["If you have ",(0,r.jsx)(t.a,{href:"https://github.com/backstage/backstage/blob/9aac2b0d36bdb8095ea747fe5e5490cfea1c9f16/contrib/docs/tutorials/authenticate-api-requests.md",children:"authenticate-api-requests.md"})," installed in your backend, you should generally remove it and rely on the new auth services instead. If you do not wish to make that change yet but still want to upgrade to the latest release of Backstage, you can also leave it in place and instead disable the default auth policy as described in the next section."]}),"\n",(0,r.jsx)(t.h3,{id:"disabling-the-default-auth-policy",children:"Disabling the default auth policy"}),"\n",(0,r.jsx)(t.p,{children:"If you do not want to enforce authentication of requests by default, you can disable the default auth policy. This is done using the following configuration:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-yaml",children:"backend:\n  auth:\n    dangerouslyDisableDefaultAuthPolicy: true\n"})}),"\n",(0,r.jsxs)(t.p,{children:["In short, this will allow requests through to plugins in your backend, even if they do not include any credentials. The requests will still be treated as unauthenticated however, which not all plugin endpoints may accept. For more information on the impact of this configuration, see the ",(0,r.jsx)(t.a,{href:"/docs/backend-system/core-services/auth",children:"auth service documentation"}),"."]}),"\n",(0,r.jsx)(t.h3,{id:"migrating-the-backend",children:"Migrating the backend"}),"\n",(0,r.jsx)(t.p,{children:"If you do want to keep the default auth policy in effect, there is some minor action needed to migrate the backend itself. Be sure to upgrade all plugins to their latest versions to pick up any updates that may be needed for the new auth services. If you have any internal plugins or modules, refer to the plugin migration section below."}),"\n",(0,r.jsxs)(t.p,{children:["With the default auth policy in effect you will now need to ensure that the requests to your backend are authenticated, also during local development. If you already have a setup where you use an auth provider for local development, you can keep using that. But, if you rely on the ",(0,r.jsx)(t.code,{children:"'guest'"})," access for local development we recommend that you install the new guest provider module in your auth backend:"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-sh",children:"yarn --cwd packages/backend add @backstage/plugin-auth-backend-module-guest-provider\n"})}),"\n",(0,r.jsx)(t.p,{children:"Add it to your backend:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-ts",metastring:'title="packages/backend/src/index.ts"',children:"// highlight-add-next-line\nbackend.add(import('@backstage/plugin-auth-backend-module-guest-provider'));\n"})}),"\n",(0,r.jsx)(t.p,{children:"Lastly, add the following to your development configuration:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-yaml",children:"auth:\n  providers:\n    guest: {}\n"})}),"\n",(0,r.jsx)(t.p,{children:"Make sure that you only enable the guest provider for local development, and not in production. It will refuse to be enabled in production by default, but it is still best to avoid it entirely. If you do not have a separate development configuration, add the following to your production configuration:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-yaml",children:"auth:\n  providers:\n    guest: null\n"})}),"\n",(0,r.jsxs)(t.p,{children:["That's all you need for guest authentication! The default ",(0,r.jsx)(t.code,{children:"SignInPage"})," from ",(0,r.jsx)(t.code,{children:"@backstage/core-components"})," will detect and use the guest provider if it's enabled."]}),"\n",(0,r.jsxs)(t.p,{children:["Since the default auth policy is in effect for all plugins running in the new backend system, you do not need to worry about whether individual plugins are protected or not. The impact of plugins not yet being migrated is that they may have endpoints that should allow unauthenticated requests, but are now blocked by the default auth policy. If you want to temporarily work around this for individual plugins, you can install a module for the plugin that adds the required policy via the ",(0,r.jsx)(t.a,{href:"/docs/backend-system/core-services/http-router",children:"http router service"}),"."]}),"\n",(0,r.jsxs)(t.p,{children:["If you have a custom ",(0,r.jsx)(t.a,{href:"/docs/backend-system/core-services/identity",children:"identity"})," or ",(0,r.jsx)(t.a,{href:"/docs/backend-system/core-services/token-manager",children:"token manager"})," service implementations you can use the ",(0,r.jsx)(t.code,{children:"createLegacyAuthAdapters"})," helper from ",(0,r.jsx)(t.code,{children:"@backstage/backend-common"})," to adapt them for the new auth services."]}),"\n",(0,r.jsx)(t.h2,{id:"plugin--module-migration",children:"Plugin & Module migration"}),"\n",(0,r.jsx)(t.p,{children:"This part of the guide will help you migrate your backend plugin or module to using the new auth APIs. It is split into two main sections: the first is to add any required auth policies to your plugin for the new backend system, and the second is to migrate to use the new auth services. This first step more urgent and may be required for your plugin to keep functioning in the new backend system, while the second step is less urgent and won't be required until support for the old auth services is removed."}),"\n",(0,r.jsx)(t.h3,{id:"adding-auth-policies",children:"Adding auth policies"}),"\n",(0,r.jsxs)(t.p,{children:["If your plugin supports the ",(0,r.jsx)(t.a,{href:"/docs/backend-system/",children:"new backend system"})," you may need to add exceptions to the default auth policy. If your plugins is supposed to accept unauthenticated requests or requests authenticated with a user cookie, then you need to add a policy for that. This is done using the ",(0,r.jsx)(t.code,{children:"httpRouter"})," service. For example, the following allows unauthenticated requests to the ",(0,r.jsx)(t.code,{children:"/health"})," endpoint:"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-ts",children:"export default createBackendPlugin({\n  pluginId: 'example',\n  register(env) {\n    env.registerInit({\n      deps: {\n        config: coreServices.rootConfig,\n        logger: coreServices.logger,\n        httpRouter: coreServices.httpRouter,\n        auth: coreServices.auth,\n        httpAuth: coreServices.httpAuth,\n      },\n      async init({ config, logger, httpRouter, auth, httpAuth }) {\n        httpRouter.use(await createRouter({ config, logger, auth, httpAuth }));\n\n        // highlight-add-start\n        httpRouter.addAuthPolicy({\n          path: '/health',\n          allow: 'unauthenticated',\n        });\n        // highlight-add-end\n      },\n    });\n  },\n});\n"})}),"\n",(0,r.jsx)(t.h3,{id:"using-the-new-auth-services",children:"Using the new auth services"}),"\n",(0,r.jsxs)(t.p,{children:["The goal in this section is to completely remove usages of the existing ",(0,r.jsx)(t.a,{href:"/docs/backend-system/core-services/identity",children:"identity"})," and ",(0,r.jsx)(t.a,{href:"/docs/backend-system/core-services/token-manager",children:"token manager"})," services from inside your plugin, and instead use the new ",(0,r.jsx)(t.a,{href:"/docs/backend-system/core-services/auth",children:"auth"})," and ",(0,r.jsx)(t.a,{href:"/docs/backend-system/core-services/http-auth",children:"http auth"})," services. You plugin may still accept the ",(0,r.jsx)(t.code,{children:"identity"})," and ",(0,r.jsx)(t.code,{children:"tokenManager"})," services as optional dependencies from the plugin environment though, in order to avoid breaking the setup for existing users."]}),"\n",(0,r.jsxs)(t.p,{children:["If your plugin does not currently rely on the ",(0,r.jsx)(t.code,{children:"identity"})," or ",(0,r.jsx)(t.code,{children:"tokenManager"})," services or uses the ",(0,r.jsx)(t.code,{children:"DefaultIdentityClient"})," internally, then this step is not required and no further action is needed."]}),"\n",(0,r.jsxs)(t.p,{children:["This guide assumes that your plugin uses the ",(0,r.jsx)(t.code,{children:"createRouter"})," pattern as its external API for the old backend system. If you have different and/or other external API surfaces they should be treated in the same way, but you may need to adapt these examples to fit your implementation."]}),"\n",(0,r.jsx)(t.h4,{id:"updating-dependencies-in-the-new-backend-system",children:"Updating dependencies in the new backend system"}),"\n",(0,r.jsxs)(t.p,{children:["If your plugin supports the new backend system, the first step of the migration is to make sure that we use the new auth services. For now we will add both ",(0,r.jsx)(t.code,{children:"AuthService"})," and ",(0,r.jsx)(t.code,{children:"HttpAuthService"}),", but it may be that you only need one of them in the end, in which case you can remove the other."]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-ts",children:"export default createBackendPlugin({\n  pluginId: 'example',\n  register(env) {\n    env.registerInit({\n      deps: {\n        config: coreServices.rootConfig,\n        logger: coreServices.logger,\n        discovery: coreServices.discovery,\n        httpRouter: coreServices.httpRouter,\n        // highlight-remove-start\n        identity: coreServices.identity,\n        tokenManager: coreServices.tokenManager,\n        // highlight-remove-end\n        // highlight-add-start\n        auth: coreServices.auth,\n        httpAuth: coreServices.httpAuth,\n        // highlight-add-end\n      },\n      async init({\n        config,\n        logger,\n        discovery,\n        httpRouter,\n        // highlight-remove-start\n        identity,\n        tokenManager,\n        // highlight-remove-end\n        // highlight-add-start\n        auth,\n        httpAuth,\n        // highlight-add-end\n      }) {\n        const router = await createRouter({\n          config,\n          logger,\n          discovery,\n          // highlight-remove-start\n          identity,\n          tokenManager,\n          // highlight-remove-end\n          // highlight-add-start\n          auth,\n          httpAuth,\n          // highlight-add-end\n        });\n        httpRouter.use();\n      },\n    });\n  },\n});\n"})}),"\n",(0,r.jsxs)(t.p,{children:["Don't worry if your plugin doesn't currently depend on the ",(0,r.jsx)(t.code,{children:"identity"})," or ",(0,r.jsx)(t.code,{children:"tokenManager"})," service, that can be ignored. However, if your plugin doesn't already depend on the ",(0,r.jsx)(t.code,{children:"discovery"})," service you will need to add that as a required dependence, as it is needed for the compatibility layer that we will introduce."]}),"\n",(0,r.jsxs)(t.h4,{id:"making-the-new-auth-services-available-in-createrouter",children:["Making the new auth services available in ",(0,r.jsx)(t.code,{children:"createRouter"})]}),"\n",(0,r.jsxs)(t.p,{children:["In order to make the new auth services available to the plugin implementation in a backwards compatible way, we use the ",(0,r.jsx)(t.code,{children:"createLegacyAuthAdapters"})," helper from ",(0,r.jsx)(t.code,{children:"@backstage/backend-common"}),". This helper accepts both the old and new auth services, and returns implementations for the new ones. If provided with implementations for the new services it will pass them through directly, which is what we want for the new backend system. If the new services are not provide it will instead create fallback implementations using the old services, falling back to default implementations of the old services if they are not available either."]}),"\n",(0,r.jsxs)(t.p,{children:["In practice, this is what it might look like to apply this change to the ",(0,r.jsx)(t.code,{children:"createRouter"})," function:"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-ts",children:"export interface RouterOptions {\n  config: RootConfigService;\n  logger: LoggerService;\n  discovery: DiscoveryService;\n  identity?: IdentityService;\n  // highlight-add-start\n  auth?: AuthService;\n  httpAuth?: HttpAuthService;\n  // highlight-add-end\n}\n\nexport function createRouter(options: RouterOptions) {\n  // highlight-add-next-line\n  const { auth, httpAuth } = createLegacyAuthAdapters(options);\n\n  // ... the rest of the implementation\n}\n"})}),"\n",(0,r.jsxs)(t.p,{children:["Note that if your ",(0,r.jsx)(t.code,{children:"createRouter"})," function doesn't already accept the ",(0,r.jsx)(t.code,{children:"identity"})," or ",(0,r.jsx)(t.code,{children:"tokenManager"})," services, you should ",(0,r.jsx)(t.strong,{children:"not"})," add them. Likewise, if there is any default implementation used by your plugin for either of those services, then that implementation ",(0,r.jsx)(t.strong,{children:"must"})," be passed on to ",(0,r.jsx)(t.code,{children:"createLegacyAuthAdapters"}),". Both of these constraints ensure that your plugin will continue to behave in the same way as before."]}),"\n",(0,r.jsxs)(t.p,{children:["As mentioned earlier, you may end up not needing both ",(0,r.jsx)(t.code,{children:"auth"})," and ",(0,r.jsx)(t.code,{children:"httpAuth"})," in the implementation. If that is the case you should remove the unused one from the router options."]}),"\n",(0,r.jsx)(t.h4,{id:"replacing-old-auth-service-calls",children:"Replacing old auth service calls"}),"\n",(0,r.jsxs)(t.p,{children:["Once the ",(0,r.jsx)(t.code,{children:"auth"})," and ",(0,r.jsx)(t.code,{children:"httpAuth"})," services are available in the plugin implementation, what's left is to replace existing usage of the ",(0,r.jsx)(t.code,{children:"identity"})," and ",(0,r.jsx)(t.code,{children:"tokenManager"})," services. In this section we'll walk through and explain the most common usages of the existing services, and how to migrate those to use the new services instead."]}),"\n",(0,r.jsx)(t.h5,{id:"example-1-making-a-standalone-service-to-service-request",children:"Example 1: Making a standalone service-to-service request"}),"\n",(0,r.jsx)(t.p,{children:"To generate a new service token for a service-to-service request that is not in a request path or needs elevated privileges, you would previously use the following:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-ts",children:"const { token } = await tokenManager.getToken();\n"})}),"\n",(0,r.jsx)(t.p,{children:"The equivalent using the new auth services is the following:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-ts",children:"const { token } = await auth.getPluginRequestToken({\n  onBehalfOf: await auth.getOwnServiceCredentials(),\n  targetPluginId: '<plugin-id>', // e.g. 'catalog'\n});\n"})}),"\n",(0,r.jsxs)(t.p,{children:["The ",(0,r.jsx)(t.code,{children:"onBehalfOf"})," option provides the credentials we want to use for the request. Here we use the plugin's own credentials, but in other places you'll see how it is also used to forward the credentials from incoming requests."]}),"\n",(0,r.jsxs)(t.p,{children:["The ",(0,r.jsx)(t.code,{children:"targetPluginId"})," is a new requirement that allows for a more fine-grained control of service-to-service auth. When generating a new token for a service-to-service request, you must now specify the ID of the plugin that you want to make the request towards."]}),"\n",(0,r.jsx)(t.h5,{id:"example-2-forwarding-credentials-from-an-incoming-request",children:"Example 2: Forwarding credentials from an incoming request"}),"\n",(0,r.jsx)(t.p,{children:"Reading the credentials from an incoming request typically looked like this:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-ts",children:"router.get('/example/:entityRef', async (req, _res) => {\n  const token = getBearerTokenFromAuthorizationHeader(\n    req.header('authorization'),\n  );\n\n  // Some followup call using the token, for example using the catalog client\n  const entity = await catalogClient.getEntityByRef(req.params.entityRef, {\n    token,\n  });\n\n  // Or forwarding the token to evaluate permissions\n  await permissions.authorize(\n    [{ permission: examplePermission, resourceRef: entityRef }],\n    { token },\n  );\n});\n"})}),"\n",(0,r.jsx)(t.p,{children:"The new auth services intentionally add an additional step to this process, in order to avoid direct forwarding of both user and service tokens in upstream requests. You now instead first extract the credentials from the incoming requests, and then use those credentials to generate new tokens for upstream requests."}),"\n",(0,r.jsx)(t.p,{children:"With the new auth services, the above example now looks like this:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-ts",children:"router.get('/example/:entityRef', async (req, _res) => {\n  const credentials = await httpAuth.credentials(req);\n\n  // The catalog client only accepts tokens right now, it will be updated\n  // to accept credentials directly in the future.\n  // For now we will need to issue a new token to pass to the catalog client.\n  const { token } = await auth.getPluginRequestToken({\n    onBehalfOf: credentials,\n    targetPluginId: 'catalog',\n  });\n  const entity = await catalogClient.getEntityByRef(req.params.entityRef, {\n    token,\n  });\n\n  // The permissions service accepts credentials directly\n  await permissions.authorize(\n    [{ permission: examplePermission, resourceRef: entityRef }],\n    { credentials },\n  );\n});\n"})}),"\n",(0,r.jsxs)(t.p,{children:["Note that for the above ",(0,r.jsx)(t.code,{children:"permissions"})," call to work you will need to update your plugin to depend on the ",(0,r.jsx)(t.code,{children:"PermissionsService"})," from ",(0,r.jsx)(t.code,{children:"@backstage/backend-plugin-api"}),", rather than ",(0,r.jsx)(t.code,{children:"PermissionEvaluator"}),"."]}),"\n",(0,r.jsxs)(t.p,{children:["As a general pattern you will want to refactor your plugin so that it forwards the ",(0,r.jsx)(t.code,{children:"BackstageCredentials"})," objects as far as possible, only generating tokens immediately before they are used."]}),"\n",(0,r.jsx)(t.h5,{id:"example-3-getting-the-user-identity-from-a-request",children:"Example 3: Getting the user identity from a request"}),"\n",(0,r.jsxs)(t.p,{children:["To get the user identity from an incoming request you would previously use the ",(0,r.jsx)(t.code,{children:"identity"})," service:"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-ts",children:"router.get('/example/by-user', async (req, _res) => {\n  const user = await identity.getIdentity({ request: req });\n\n  if (!user) {\n    throw new AuthenticationError();\n  }\n\n  console.log(`User ${user.identity.userEntityRef} is making a request`);\n});\n"})}),"\n",(0,r.jsx)(t.p,{children:"The equivalent using the new auth services is the following:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-ts",children:"router.get('/example/by-user', async (req, _res) => {\n  const credentials = await httpAuth.credentials(req, { allow: ['user'] });\n\n  console.log(\n    `User ${credentials.principal.userEntityRef} is making a request`,\n  );\n});\n"})}),"\n",(0,r.jsxs)(t.p,{children:["In the above code the ",(0,r.jsx)(t.code,{children:"allow"})," option of the ",(0,r.jsx)(t.code,{children:"credentials"})," call is used to narrow down the accepted user credentials. If the incoming requests is not authenticated as a user, the ",(0,r.jsx)(t.code,{children:"credentials"})," call will throw an error."]}),"\n",(0,r.jsxs)(t.p,{children:["If your existing code do not require an authenticated user but only uses it if available, you can instead pass ",(0,r.jsx)(t.code,{children:"allow: ['user', 'service', 'none']"})," to the ",(0,r.jsx)(t.code,{children:"credentials"})," call and then check the ",(0,r.jsx)(t.code,{children:"credentials.principal.type"}),"."]})]})}function d(e={}){const{wrapper:t}={...(0,i.a)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(u,{...e})}):u(e)}},371426:(e,t,n)=>{var r=n(827378),i=Symbol.for("react.element"),a=Symbol.for("react.fragment"),o=Object.prototype.hasOwnProperty,s=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,c={key:!0,ref:!0,__self:!0,__source:!0};function l(e,t,n){var r,a={},l=null,u=null;for(r in void 0!==n&&(l=""+n),void 0!==t.key&&(l=""+t.key),void 0!==t.ref&&(u=t.ref),t)o.call(t,r)&&!c.hasOwnProperty(r)&&(a[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps)void 0===a[r]&&(a[r]=t[r]);return{$$typeof:i,type:e,key:l,ref:u,props:a,_owner:s.current}}t.Fragment=a,t.jsx=l,t.jsxs=l},541535:(e,t)=>{var n=Symbol.for("react.element"),r=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),a=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),s=Symbol.for("react.provider"),c=Symbol.for("react.context"),l=Symbol.for("react.forward_ref"),u=Symbol.for("react.suspense"),d=Symbol.for("react.memo"),h=Symbol.for("react.lazy"),p=Symbol.iterator;var g={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},f=Object.assign,m={};function y(e,t,n){this.props=e,this.context=t,this.refs=m,this.updater=n||g}function v(){}function b(e,t,n){this.props=e,this.context=t,this.refs=m,this.updater=n||g}y.prototype.isReactComponent={},y.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},y.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},v.prototype=y.prototype;var w=b.prototype=new v;w.constructor=b,f(w,y.prototype),w.isPureReactComponent=!0;var x=Array.isArray,k=Object.prototype.hasOwnProperty,j={current:null},_={key:!0,ref:!0,__self:!0,__source:!0};function q(e,t,r){var i,a={},o=null,s=null;if(null!=t)for(i in void 0!==t.ref&&(s=t.ref),void 0!==t.key&&(o=""+t.key),t)k.call(t,i)&&!_.hasOwnProperty(i)&&(a[i]=t[i]);var c=arguments.length-2;if(1===c)a.children=r;else if(1<c){for(var l=Array(c),u=0;u<c;u++)l[u]=arguments[u+2];a.children=l}if(e&&e.defaultProps)for(i in c=e.defaultProps)void 0===a[i]&&(a[i]=c[i]);return{$$typeof:n,type:e,key:o,ref:s,props:a,_owner:j.current}}function S(e){return"object"==typeof e&&null!==e&&e.$$typeof===n}var R=/\/+/g;function I(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return t[e]}))}(""+e.key):t.toString(36)}function A(e,t,i,a,o){var s=typeof e;"undefined"!==s&&"boolean"!==s||(e=null);var c=!1;if(null===e)c=!0;else switch(s){case"string":case"number":c=!0;break;case"object":switch(e.$$typeof){case n:case r:c=!0}}if(c)return o=o(c=e),e=""===a?"."+I(c,0):a,x(o)?(i="",null!=e&&(i=e.replace(R,"$&/")+"/"),A(o,t,i,"",(function(e){return e}))):null!=o&&(S(o)&&(o=function(e,t){return{$$typeof:n,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(o,i+(!o.key||c&&c.key===o.key?"":(""+o.key).replace(R,"$&/")+"/")+e)),t.push(o)),1;if(c=0,a=""===a?".":a+":",x(e))for(var l=0;l<e.length;l++){var u=a+I(s=e[l],l);c+=A(s,t,i,u,o)}else if(u=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=p&&e[p]||e["@@iterator"])?e:null}(e),"function"==typeof u)for(e=u.call(e),l=0;!(s=e.next()).done;)c+=A(s=s.value,t,i,u=a+I(s,l++),o);else if("object"===s)throw t=String(e),Error("Objects are not valid as a React child (found: "+("[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return c}function E(e,t,n){if(null==e)return e;var r=[],i=0;return A(e,r,"","",(function(e){return t.call(n,e,i++)})),r}function T(e){if(-1===e._status){var t=e._result;(t=t()).then((function(t){0!==e._status&&-1!==e._status||(e._status=1,e._result=t)}),(function(t){0!==e._status&&-1!==e._status||(e._status=2,e._result=t)})),-1===e._status&&(e._status=0,e._result=t)}if(1===e._status)return e._result.default;throw e._result}var P={current:null},C={transition:null},M={ReactCurrentDispatcher:P,ReactCurrentBatchConfig:C,ReactCurrentOwner:j};t.Children={map:E,forEach:function(e,t,n){E(e,(function(){t.apply(this,arguments)}),n)},count:function(e){var t=0;return E(e,(function(){t++})),t},toArray:function(e){return E(e,(function(e){return e}))||[]},only:function(e){if(!S(e))throw Error("React.Children.only expected to receive a single React element child.");return e}},t.Component=y,t.Fragment=i,t.Profiler=o,t.PureComponent=b,t.StrictMode=a,t.Suspense=u,t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=M,t.cloneElement=function(e,t,r){if(null==e)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var i=f({},e.props),a=e.key,o=e.ref,s=e._owner;if(null!=t){if(void 0!==t.ref&&(o=t.ref,s=j.current),void 0!==t.key&&(a=""+t.key),e.type&&e.type.defaultProps)var c=e.type.defaultProps;for(l in t)k.call(t,l)&&!_.hasOwnProperty(l)&&(i[l]=void 0===t[l]&&void 0!==c?c[l]:t[l])}var l=arguments.length-2;if(1===l)i.children=r;else if(1<l){c=Array(l);for(var u=0;u<l;u++)c[u]=arguments[u+2];i.children=c}return{$$typeof:n,type:e.type,key:a,ref:o,props:i,_owner:s}},t.createContext=function(e){return(e={$$typeof:c,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null}).Provider={$$typeof:s,_context:e},e.Consumer=e},t.createElement=q,t.createFactory=function(e){var t=q.bind(null,e);return t.type=e,t},t.createRef=function(){return{current:null}},t.forwardRef=function(e){return{$$typeof:l,render:e}},t.isValidElement=S,t.lazy=function(e){return{$$typeof:h,_payload:{_status:-1,_result:e},_init:T}},t.memo=function(e,t){return{$$typeof:d,type:e,compare:void 0===t?null:t}},t.startTransition=function(e){var t=C.transition;C.transition={};try{e()}finally{C.transition=t}},t.unstable_act=function(){throw Error("act(...) is not supported in production builds of React.")},t.useCallback=function(e,t){return P.current.useCallback(e,t)},t.useContext=function(e){return P.current.useContext(e)},t.useDebugValue=function(){},t.useDeferredValue=function(e){return P.current.useDeferredValue(e)},t.useEffect=function(e,t){return P.current.useEffect(e,t)},t.useId=function(){return P.current.useId()},t.useImperativeHandle=function(e,t,n){return P.current.useImperativeHandle(e,t,n)},t.useInsertionEffect=function(e,t){return P.current.useInsertionEffect(e,t)},t.useLayoutEffect=function(e,t){return P.current.useLayoutEffect(e,t)},t.useMemo=function(e,t){return P.current.useMemo(e,t)},t.useReducer=function(e,t,n){return P.current.useReducer(e,t,n)},t.useRef=function(e){return P.current.useRef(e)},t.useState=function(e){return P.current.useState(e)},t.useSyncExternalStore=function(e,t,n){return P.current.useSyncExternalStore(e,t,n)},t.useTransition=function(){return P.current.useTransition()},t.version="18.2.0"},827378:(e,t,n)=>{e.exports=n(541535)},824246:(e,t,n)=>{e.exports=n(371426)},511151:(e,t,n)=>{n.d(t,{Z:()=>s,a:()=>o});var r=n(667294);const i={},a=r.createContext(i);function o(e){const t=r.useContext(a);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function s(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),r.createElement(a.Provider,{value:t},e.children)}}}]);