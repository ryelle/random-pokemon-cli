'use strict';

const lang = 'en';
const width = 60;

const Request = require( 'request-promise' );
const find = require( 'lodash/find' );
const wrap = require( 'wordwrap' )( width );

const id = Math.floor( Math.random() * 722 );
const options = {
	uri: 'http://pokeapi.co/api/v2/pokemon-species/' + id + '/',
	json: true // Automatically parses the JSON string in the response 
};

function getLocalizedObject( names, language ) {
	return find( names, ( name ) => {
		return ( name.language.name === language );
	} );
}

console.log( "Fetching a pokemon…" );

Request( options ).then( ( response ) => {
	let flavorText = getLocalizedObject( response.flavor_text_entries, lang ).flavor_text.replace( /\n/g, ' ' );
	let title = getLocalizedObject( response.names, lang ).name;
	let padding = new Array( Math.floor( ( width - title.length ) / 2 ) ).join( ' ' );

	console.log( Array( width + 1 ).join( '=' ) );
	console.log( padding, title );
	console.log( Array( width + 1 ).join( '-' ) );
	console.log( wrap( flavorText ) );
	console.log( Array( width + 1 ).join( '=' ) );

} ).catch( ( error ) => {
	console.error( error );
} );
