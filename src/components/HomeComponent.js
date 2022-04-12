import React from 'react';
import NavigateButtonComponent from './NavigateButtonComponent';

const HomeComponent = () => {

    const tabs = [0,1,2,3,4];
    const paths = ["/mail/compose","/mail/inbox","/mail/sent","/mail/drafts","/mail/outbox"];
    const texts = ["Compose","Inbox","Sent","Drafts","Outbox"];

    return (
        <div class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            {tabs.map((index)=>(
                <NavigateButtonComponent index={index} path={paths[index]} text={texts[index]}></NavigateButtonComponent>
            ))}
        </div>
    )
}

export default HomeComponent