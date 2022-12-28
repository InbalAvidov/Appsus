const { Link } = ReactRouterDOM

export function MailsPreview({ mails }) {
    console.log(mails)
    if(mails.length<=0) return <p>Loading...</p>
    return < table >
        <tbody>
            <tr>
                <th>From</th>
                <th>Subject</th>
                <th>At</th>
            </tr>
            {mails.map(mail => {
                return <tr key={mail.id}>
                    <td>{mail.from}</td>
                    <td>{mail.subject}</td>
                    <td>{new Date(mail.sentAt).toDateString()}</td>
                    <td><Link to={`/mail/${mail.id}`}>More...</Link></td>
                </tr>
            })}
        </tbody>
    </table >
}

