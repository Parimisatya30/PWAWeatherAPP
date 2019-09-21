<template>
    <v-app>
        <v-app-bar app>
            <v-toolbar-title class="headline text-uppercase">
                <span>Weather forecast</span>
                <span class="font-weight-light"> Dashboard</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
        </v-app-bar>
        <v-content>
            <dashboard />
        </v-content>
    </v-app>
</template>
<script>
    import dashboard from './components/dashboard';

    export default {
        name: 'app',
        components: {
            dashboard,
        },
    };
</script>
