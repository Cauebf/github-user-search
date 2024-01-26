const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user){
        this.userProfile.innerHTML = `<div class="info">
                                        <img src="${user.avatarUrl}" alt="Foto do perfil do usuário" />
                                        <div class="data">
                                            <h1>${user.name ?? 'Não possui nome cadastrado 😢'}</h1>
                                            <p>${user.bio ?? 'Não possui bio cadastrada 😢'}</p>
                                            <br>
                                            <p>👥 Seguidores: <span class="numbers">${user.followers}<span></p>
                                            <p>👥 Seguindo: <span class="numbers">${user.following}</span></p>
                                        </div>
                                      </div>`

        let eventsItens = ''
        user.events.forEach(repo => { 
            let eventMessage = ''
            const pushEvent = repo.type === 'PushEvent'
            
            pushEvent ? eventMessage = repo.payload.commits[0].message : eventMessage = `Created a new ${repo.payload.ref_type}`
            
            eventsItens += `<li><p><a href="https://github.com/${repo.repo.name}" target="_blank">${repo.repo.name}</a> - <span>${eventMessage}</span></p></li>`
        })

        if(user.events.length > 0){
            this.userProfile.innerHTML += `<div class="events section">
                                                <h2>Eventos</h2>
                                                <ul>${eventsItens}</ul>
                                           </div>`
        }

        let repositoriesItens = ''
        user.repositories.forEach(repo => repositoriesItens += `<li>
                                                                    <a href="${repo.html_url}" target="_blank">
                                                                        ${repo.name}
                                                                        <div>
                                                                            <span>🍴${repo.forks}</span>
                                                                            <span>⭐${repo.stargazers_count}</span>
                                                                            <span>👀${repo.watchers}</span>
                                                                            <span>👨‍💻${repo.language ? repo.language : '-'}</span>
                                                                        </div>
                                                                    </a>
                                                                </li>`)     
        
        if(user.repositories.length > 0){
            this.userProfile.innerHTML += `<div class="repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItens}</ul>
                                           </div>`
        }
    },

    renderNotFound(){
        this.userProfile.innerHTML = "<h3>Usuário não encontrado 🤔</h3>"
    }
}

export { screen }