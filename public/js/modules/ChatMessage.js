// the export statement means that everything inside the curly braces 
// will be made public when you import this file into another via the import statement

export default {
    props: ['msg'],

    template: `
        <p class="new-message" :class="{ 'my-message' : matchID }">
            <span>{{msg.message.name}} says:</span>
            {{msg.message.content}}
        </p>
    `,

    data: function(){
        // notin here yet, but there will be
        return { 
            matchID: this.$parent.socketID == this.msg.id
        }
    }
}