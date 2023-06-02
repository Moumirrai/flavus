import { CommandArgs, iCommand } from 'flavus';
import { MessageEmbed } from 'discord.js';

const AutoplayCommand: iCommand = {
  name: 'autoplay',
  aliases: [],
  voiceRequired: false,
  joinPermissionRequired: false,
  playerRequired: false,
  sameChannelRequired: false,
  visible: true,
  description: 'Toggles or changes autoplay config',
  usage: '`<prefix>autoplay` or `<prefix>autoplay switch`',
  async execute({ client, message, args }: CommandArgs) {
    const doc = await client.functions.fetchGuildConfig(message.guild.id);
    let newDoc = false;
    if (!doc)
      return client.embeds.error(message.channel, 'Something went wrong!');
    if (!doc.autoplay) {
      newDoc = true;
      doc.autoplay = {
        active: true,
        mode: 'yt'
      };
    }
    if (args[0] && args[0] === 'switch') {
      doc.autoplay.mode = doc.autoplay.mode === 'yt' ? 'spotify' : 'yt';
    } else if (!newDoc) {
      doc.autoplay.active = !doc.autoplay.active;
    }
    doc.save().catch((err) => client.logger.error(err));
    return message.channel.send({
      embeds: [
        new MessageEmbed()
          .setColor(client.config.embed.color)
          .setTitle(
            doc.autoplay.active
              ? 'Autoplay is enabled!'
              : "Autoplay is disabled!"
          )
          .setDescription(
            `Current mode - **${
              doc.autoplay.mode === 'yt' ? 'YouTube' : 'Spotify'
            }**\nTo change mode, use \`<prefix>autoplay switch\``
          )
      ]
    });
    /*
    GuildModel.findOne({ guildID: message.guild.id }, (err, settings) => {
      if (err) return client.logger.error(err);
      if (!settings) {
        settings = new GuildModel({
          guildID: message.guild.id,
          autoplay: {
            active: true,
            mode: 'yt'
          }
        });
        settings.save().catch((err) => client.logger.error(err));
        return message.channel.send({
          embeds: [
            new MessageEmbed()
              .setColor(client.config.embed.color)
              .setTitle(`Autoplay is now enabled!`)
              .setDescription(
                `Current mode - **${
                  settings.autoplay.mode === 'yt' ? 'YouTube' : 'Spotify'
                }**\nTo change mode, use \`<prefix>autoplay switch\``
              )
          ]
        });
      } else {
        if (args[0] && args[0] === 'switch') {
          settings.autoplay.mode =
            settings.autoplay.mode === 'yt' ? 'spotify' : 'yt';
          settings.save().catch((err) => client.logger.error(err));
          return message.channel.send({
            embeds: [
              new MessageEmbed()
                .setColor(client.config.embed.color)
                .setTitle(`Autoplay`)
                .setDescription(
                  `Mode switched to - **${
                    settings.autoplay.mode === 'yt' ? 'YouTube' : 'Spotify'
                  }**\nTo change mode, use \`<prefix>autoplay switch\``
                )
            ]
          });
        }
        settings.autoplay.active = !settings.autoplay.active;
        settings.save().catch((err) => client.logger.error(err));
        if (settings.autoplay.active) {
          return message.channel.send({
            embeds: [
              new MessageEmbed()
                .setColor(client.config.embed.color)
                .setTitle(`Autoplay is now enabled!`)
                .setDescription(
                  `Current mode - **${
                    settings.autoplay.mode === 'yt' ? 'YouTube' : 'Spotify'
                  }**\nTo change mode, use \`<prefix>autoplay switch\``
                )
            ]
          });
        } else {
          return message.channel.send({
            embeds: [
              new MessageEmbed()
                .setColor(client.config.embed.errorcolor)
                .setTitle(`Autoplay is now disabled!`)
            ]
          });
        }
      }
    });
    */
  }
};

export default AutoplayCommand;
