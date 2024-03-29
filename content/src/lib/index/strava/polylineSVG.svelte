<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import mapboxgl from 'mapbox-gl';
	import { toGeoJSON } from '@mapbox/polyline';
	import bbox from '@turf/bbox';
	const token = import.meta.env.VITE_MAPBOX_TOKEN;

	export let polyline: string;

	let prefersDarkMode = false;

	let map: mapboxgl.Map | null;
	let mapElement: HTMLElement;

	onMount(() => {
		prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
		mapboxgl.accessToken = token;
		map = new mapboxgl.Map({
			container: mapElement,
			style: prefersDarkMode
				? 'mapbox://styles/mapbox/dark-v11?optimize=true'
				: 'mapbox://styles/mapbox/light-v11?optimize=true',
			antialias: true,
			attributionControl: false,
			zoom: 0,
			scrollZoom: false,
			dragPan: false,
			doubleClickZoom: false
		}).addControl(new mapboxgl.AttributionControl({ compact: true }));
		map.on('load', () => {
			const data = toGeoJSON(polyline);
			map?.addSource('route', {
				type: 'geojson',
				data
			});
			map?.addLayer({
				id: 'route',
				type: 'line',
				source: 'route',
				layout: {
					'line-join': 'miter',
					'line-cap': 'square'
				},
				paint: {
					'line-color': prefersDarkMode ? '#FFF' : '#000',
					'line-width': 1.5,
					'line-opacity': 0.8
				}
			});
			const bounds = bbox(data);
			map?.fitBounds([bounds[0], bounds[1], bounds[2], bounds[3]], { padding: 20, duration: 0 });
			map?.resize();
		});
	});

	onDestroy(() => {
		if (map) {
			map.remove();
			map = null;
		}
	});
</script>

<div class="container">
	<div id="map" bind:this={mapElement} />
</div>

<svelte:head>
	<link href="https://api.mapbox.com/mapbox-gl-js/v2.12.0/mapbox-gl.css" rel="stylesheet" />
</svelte:head>

<style>
	#map {
		width: 350px;
		height: 250px;
		border: 0.5px solid var(--border);
	}

	@media (max-width: 400px) {
		#map {
			width: 100%;
		}
	}
</style>
