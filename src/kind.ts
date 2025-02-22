// define events dispatched by event emitter
export type EventKind =
  | RTMKind
  | EventAPIKind
  | 'interactive'
  | 'slash_commands'

export type OtherEventKind = 'interactive'

// https://api.slack.com/events
type RTMKind =
  | 'accounts_changed'
  | 'bot_added'
  | 'bot_changed'
  | 'channel_archive'
  | 'channel_created'
  | 'channel_deleted'
  | 'channel_history_changed'
  | 'channel_joined'
  | 'channel_left'
  | 'channel_marked'
  | 'channel_rename'
  | 'channel_shared'
  | 'channel_unarchive'
  | 'commands_changed'
  | 'dnd_updated'
  | 'dnd_updated_user'
  | 'email_domain_changed'
  | 'emoji_changed'
  | 'external_org_migration_finished'
  | 'external_org_migration_started'
  | 'file_change'
  | 'file_comment_added'
  | 'file_comment_deleted'
  | 'file_comment_edited'
  | 'file_created'
  | 'file_deleted'
  | 'file_public'
  | 'file_shared'
  | 'file_unshared'
  | 'goodbye'
  | 'group_archive'
  | 'group_close'
  | 'group_deleted'
  | 'group_history_changed'
  | 'group_joined'
  | 'group_left'
  | 'group_marked'
  | 'group_open'
  | 'group_rename'
  | 'group_unarchive'
  | 'hello'
  | 'im_close'
  | 'im_created'
  | 'im_history_changed'
  | 'im_marked'
  | 'im_open'
  | 'manual_presence_change'
  | 'member_joined_channel'
  | 'member_left_channel'
  | 'message'
  | 'pin_added'
  | 'pin_removed'
  | 'pref_change'
  | 'presence_change'
  | 'presence_query'
  | 'presence_sub'
  | 'reaction_added'
  | 'reaction_removed'
  | 'reconnect_url'
  | 'star_added'
  | 'star_removed'
  | 'subteam_created'
  | 'subteam_members_changed'
  | 'subteam_self_added'
  | 'subteam_self_removed'
  | 'subteam_updated'
  | 'team_domain_change'
  | 'team_join'
  | 'team_migration_started'
  | 'team_plan_change'
  | 'team_pref_change'
  | 'team_profile_change'
  | 'team_profile_delete'
  | 'team_profile_reorder'
  | 'team_rename'
  | 'user_change'
  | 'user_typing'

// https://api.slack.com/events
export type EventAPIKind =
  | 'app_home_opened'
  | 'app_mention'
  | 'app_rate_limited'
  | 'app_requested'
  | 'app_uninstalled'
  | 'call_rejected'
  | 'channel_archive'
  | 'channel_created'
  | 'channel_deleted'
  | 'channel_history_changed'
  | 'channel_id_changed'
  | 'channel_left'
  | 'channel_rename'
  | 'channel_shared'
  | 'channel_unarchive'
  | 'channel_unshared'
  | 'dnd_updated'
  | 'dnd_updated_user'
  | 'email_domain_changed'
  | 'emoji_changed'
  | 'file_change'
  | 'file_comment_added'
  | 'file_comment_deleted'
  | 'file_comment_edited'
  | 'file_created'
  | 'file_deleted'
  | 'file_public'
  | 'file_shared'
  | 'file_unshared'
  | 'grid_migration_finished'
  | 'grid_migration_started'
  | 'group_archive'
  | 'group_close'
  | 'group_deleted'
  | 'group_history_changed'
  | 'group_left'
  | 'group_open'
  | 'group_rename'
  | 'group_unarchive'
  | 'im_close'
  | 'im_created'
  | 'im_history_changed'
  | 'im_open'
  | 'invite_requested'
  | 'link_shared'
  | 'member_joined_channel'
  | 'member_left_channel'
  | 'message'
  | 'message.app_home'
  | 'message.channels'
  | 'message.groups'
  | 'message.im'
  | 'message.mpim'
  | 'pin_added'
  | 'pin_removed'
  | 'reaction_added'
  | 'reaction_removed'
  | 'resources_added'
  | 'resources_removed'
  | 'scope_denied'
  | 'scope_granted'
  | 'star_added'
  | 'star_removed'
  | 'subteam_created'
  | 'subteam_members_changed'
  | 'subteam_self_added'
  | 'subteam_self_removed'
  | 'subteam_updated'
  | 'team_access_granted'
  | 'team_access_revoked'
  | 'team_domain_change'
  | 'team_join'
  | 'team_rename'
  | 'tokens_revoked'
  | 'url_verification'
  | 'user_change'
  | 'user_resource_denied'
  | 'user_resource_granted'
  | 'user_resource_removed'
  | 'workflow_deleted'
  | 'workflow_published'
  | 'workflow_step_deleted'
  | 'workflow_step_execute'
  | 'workflow_unpublished'

export type ResponseError =
  | 'not_authed'
  | 'invalid_auth'
  | 'account_inactive'
  | 'token_revoked'
  | 'no_permission'
  | 'org_login_required'
  | 'invalid_arg_name'
  | 'invalid_array_arg'
  | 'invalid_charset'
  | 'invalid_form_data'
  | 'invalid_post_type'
  | 'missing_post_type'
  | 'team_added_to_org'
  | 'request_timeout'
  | 'fatal_error'

export type EmojiEventKind = 'add' | 'remove'

export type ItemKind = 'message' | 'file' | 'file_comment'

export type FileMode = 'hosted' | 'external' | 'snippet' | 'post'

export type FileType =
  | 'auto'
  | 'text'
  | 'ai'
  | 'apk'
  | 'applescript'
  | 'binary'
  | 'bmp'
  | 'boxnote'
  | 'c'
  | 'csharp'
  | 'cpp'
  | 'css'
  | 'csv'
  | 'clojure'
  | 'coffeescript'
  | 'cfm'
  | 'd'
  | 'dart'
  | 'diff'
  | 'doc'
  | 'docx'
  | 'dockerfile'
  | 'dotx'
  | 'email'
  | 'eps'
  | 'epub'
  | 'erlang'
  | 'fla'
  | 'flv'
  | 'fsharp'
  | 'fortran'
  | 'gdoc'
  | 'gdraw'
  | 'gif'
  | 'go'
  | 'gpres'
  | 'groovy'
  | 'gsheet'
  | 'gzip'
  | 'html'
  | 'handlebars'
  | 'haskell'
  | 'haxe'
  | 'indd'
  | 'java'
  | 'javascript'
  | 'jpg'
  | 'keynote'
  | 'kotlin'
  | 'latex'
  | 'lisp'
  | 'lua'
  | 'm4a'
  | 'markdown'
  | 'matlab'
  | 'mhtml'
  | 'mkv'
  | 'mov'
  | 'mp3'
  | 'mp4'
  | 'mpg'
  | 'mumps'
  | 'numbers'
  | 'nzb'
  | 'objc'
  | 'ocaml'
  | 'odg'
  | 'odi'
  | 'odp'
  | 'odd'
  | 'odt'
  | 'ogg'
  | 'ogv'
  | 'pages'
  | 'pascal'
  | 'pdf'
  | 'perl'
  | 'php'
  | 'pig'
  | 'png'
  | 'post'
  | 'powershell'
  | 'ppt'
  | 'pptx'
  | 'psd'
  | 'puppet'
  | 'python'
  | 'qtz'
  | 'r'
  | 'rtf'
  | 'ruby'
  | 'rust'
  | 'sql'
  | 'sass'
  | 'scala'
  | 'scheme'
  | 'sketch'
  | 'shell'
  | 'smalltalk'
  | 'svg'
  | 'swf'
  | 'swift'
  | 'tar'
  | 'tiff'
  | 'tsv'
  | 'vb'
  | 'vbscript'
  | 'vcard'
  | 'velocity'
  | 'verilog'
  | 'wav'
  | 'webm'
  | 'wmv'
  | 'xls'
  | 'xlsx'
  | 'xlsb'
  | 'xlsm'
  | 'xltx'
  | 'xml'
  | 'yaml'
  | 'zip'

// https://api.slack.com/reference/interaction-payloads
export type InteractiveKind =
  | 'block_actions'
  | 'message_action'
  | 'shortcut'
  | 'view_submission'
  | 'view_closed'

export type CallbackKind = 'hello' | 'self_introduce' | 'dsm' | 'start'
