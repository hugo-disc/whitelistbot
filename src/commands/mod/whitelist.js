const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const perguntas = require('../../utils/perguntas.json')
const config = require('../../utils/config.json')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('whitelist')
    .setDescription('comando teste'),

    async execute(interaction) {
        
        let actualQuestion = 0
        let acertos = 0
        let erros = 0
        
        const embed = new EmbedBuilder()
        .setDescription(perguntas[actualQuestion].Pergunta)
        .setColor(config.corEmbed)

        interaction.reply({ embeds: [embed], fetchReply: true }).then(async(message) => {     
            const filter = (msg) => msg.author.id === interaction.user.id
            const collector = interaction.channel.createMessageCollector(filter, { time: (10 * 60000) })

            collector.on('collect', async(collected) => {

                if(collected.content === perguntas[actualQuestion].Resposta) {
                    acertos++
                } else {
                    erros++
                }

                collected.delete()
                
                if (actualQuestion+1 == perguntas.length) {
                    collector.stop()

                    let total = acertos-erros
                    if(total < 0) total = 0

                    interaction.editReply({ embeds: [
                        embed.setDescription(config.mensagemFinal).setTitle('🔒 | FINALIZADA').addFields(
                            {
                                name: `Acertos`,
                                value: `${acertos}`
                            }, 
                            {
                                name: `Erros`,
                                value: `${erros}`
                            },
                            {
                                name: `Total`,
                                value: `${total} acertos`
                            }
                        )
                    ]})
                    return
                }

                if (actualQuestion < perguntas.length) {

                    actualQuestion++
                    interaction.editReply({ embeds: [
                        embed.setDescription(perguntas[actualQuestion].Pergunta)
                    ]})

                }

            })
        })
    }
}
