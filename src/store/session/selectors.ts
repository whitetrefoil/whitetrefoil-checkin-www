import type { RS }   from '~/hooks/use-root-selector'
import type { User } from '~/interfaces/user'

export const $token: RS<string|undefined> = s => s.session.token

export const $user: RS<User|undefined> = s => s.session.user
