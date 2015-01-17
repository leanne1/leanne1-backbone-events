<li class="card card-event" data-event-id="{{id}}">
    <div class="event-date">
        // TODO: Is this correct use of time el?
        <time>
            <span class="event-month">
                {{prettyStartMonth}}
            </span>
            <span class="event-date">
                {{prettyStartDate}}
            </span>
            <span class="event-year">
                {{prettyStartYear}}
            </span>
        </time>
    </div>
    <div class="event-details">
        <h3><a>{{name}}</a></h3>
        <button data-event="promote" data-event-id="{{id}}">
        Promote<span class="hide-visually"> this event</span>
        </button>
    </div>
</li>

