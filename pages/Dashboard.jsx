import { useState } from 'react'
import Navigation from '../components/Navigation'

const startingMembers = [
    { id: 1, name: 'Amara Otieno', email: 'amara.otieno@example.com', subscription: 'Executive' },
    { id: 2, name: 'Daniel Kimani', email: 'daniel.kimani@example.com', subscription: 'Premium' },
    { id: 3, name: 'Nia Wanjiku', email: 'nia.wanjiku@example.com', subscription: 'Regular' },
    { id: 4, name: 'Ethan Mwangi', email: 'ethan.mwangi@example.com', subscription: 'Premium' },
]

const subscriptions = ['Executive', 'Premium', 'Regular']

export default function Dashboard() {
    const [members, setMembers] = useState(startingMembers)
    const [editingMember, setEditingMember] = useState(null)
    const [isFormOpen, setIsFormOpen] = useState(false)

    const openForm = (member = null) => {
        setEditingMember(member)
        setIsFormOpen(true)
    }

    const closeForm = () => {
        setIsFormOpen(false)
        setEditingMember(null)
    }

    const saveMember = (event) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const member = {
            id: editingMember?.id ?? Date.now(),
            name: formData.get('name').trim(),
            email: formData.get('email').trim(),
            subscription: formData.get('subscription'),
        }

        setMembers((currentMembers) => editingMember
            ? currentMembers.map((currentMember) => currentMember.id === editingMember.id ? member : currentMember)
            : [member, ...currentMembers])
        closeForm()
    }

    const deleteMember = (memberId) => {
        setMembers((currentMembers) => currentMembers.filter((member) => member.id !== memberId))
    }

    const subscriptionCount = (subscription) => members.filter((member) => member.subscription === subscription).length

    return (
        <div className="app-shell">
            <main className="dashboard-main" id="overview">
                <header className="dashboard-header">
                    <div>
                        <p className="eyebrow">MEMBERSHIP MANAGEMENT</p>
                        <h1>Hello, Telvin</h1>
                        <p className="header-copy">A clear view of the people who make the club.</p>
                    </div>
                    <button className="add-member-button" onClick={() => openForm()} aria-label="Add a member">
                        <span className="material-symbol" aria-hidden="true">person_add</span>
                        <span>Add member</span>
                    </button>
                </header>

                <section className="summary-grid" id="packages" aria-label="Membership summary">
                    {subscriptions.map((subscription) => (
                        <article className={`summary-item summary-${subscription.toLowerCase()}`} key={subscription}>
                            <span className="summary-label">{subscription}</span>
                            <span className="summary-count">{subscriptionCount(subscription)}</span>
                            <span className="summary-caption">{subscriptionCount(subscription) === 1 ? 'member' : 'members'}</span>
                        </article>
                    ))}
                </section>

                <section className="members-section" id="members">
                    <div className="section-heading">
                        <div>
                            <p className="eyebrow">THE CLUB</p>
                            <h2>Current members <span className="member-total">{members.length}</span></h2>
                        </div>
                        <span className="updated-label">Membership directory</span>
                    </div>

                    <div className="member-table-wrap">
                        <table className="member-table">
                            <thead>
                                <tr>
                                    <th scope="col">Member</th>
                                    <th scope="col">Subscription</th>
                                    <th scope="col" className="actions-heading">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {members.map((member) => (
                                    <tr key={member.id}>
                                        <td>
                                            <div className="member-identity">
                                                <span className="member-avatar" aria-hidden="true">{member.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}</span>
                                                <span className="member-details">
                                                    <strong>{member.name}</strong>
                                                    <span>{member.email}</span>
                                                </span>
                                            </div>
                                        </td>
                                        <td><span className={`subscription-tag tag-${member.subscription.toLowerCase()}`}>{member.subscription}</span></td>
                                        <td>
                                            <div className="row-actions">
                                                <button className="icon-button" onClick={() => openForm(member)} aria-label={`Edit ${member.name}`} title="Edit member">
                                                    <span className="material-symbol" aria-hidden="true">edit</span>
                                                </button>
                                                <button className="icon-button delete-button" onClick={() => deleteMember(member.id)} aria-label={`Delete ${member.name}`} title="Delete member">
                                                    <span className="material-symbol" aria-hidden="true">delete_outline</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {members.length === 0 && (
                            <div className="empty-state">
                                <span>No members yet</span>
                                <button onClick={() => openForm()}>Add your first member</button>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <Navigation />

            {isFormOpen && (
                <div className="dialog-backdrop" onMouseDown={(event) => event.target === event.currentTarget && closeForm()}>
                    <section className="member-dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
                        <div className="dialog-heading">
                            <div>
                                <p className="eyebrow">MEMBER DIRECTORY</p>
                                <h2 id="dialog-title">{editingMember ? 'Update member' : 'Add a member'}</h2>
                            </div>
                            <button className="icon-button close-button" onClick={closeForm} aria-label="Close dialog">
                                <span className="material-symbol" aria-hidden="true">close</span>
                            </button>
                        </div>
                        <form className="member-form" onSubmit={saveMember}>
                            <label>
                                Full name
                                <input name="name" type="text" placeholder="e.g. Amara Otieno" defaultValue={editingMember?.name ?? ''} required autoFocus />
                            </label>
                            <label>
                                Email address
                                <input name="email" type="email" placeholder="name@example.com" defaultValue={editingMember?.email ?? ''} required />
                            </label>
                            <label>
                                Subscription
                                <select name="subscription" defaultValue={editingMember?.subscription ?? 'Regular'}>
                                    {subscriptions.map((subscription) => <option key={subscription}>{subscription}</option>)}
                                </select>
                            </label>
                            <div className="dialog-actions">
                                <button className="cancel-button" type="button" onClick={closeForm}>Cancel</button>
                                <button className="submit-button" type="submit">{editingMember ? 'Save changes' : 'Add member'}</button>
                            </div>
                        </form>
                    </section>
                </div>
            )}
        </div>
    )
}