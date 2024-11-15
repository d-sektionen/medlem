# Email function for different committees

When the backend gets support for different committees, the members can send different types of emails depending on the committee membership.

## What do the frontend need from Backend

- A list of available templates at the endpoint ```/email/templates/```.
- Available previews for the current template at ```/email/?emails=emailtype.id```.
  - Emailtype needs the fields:
    - id - For backend calls.
    - name - Visual name for choosing between templates.
    - category - What category the template is defined in. Can be like the committee, but if a template is used by multiple committees the category can be something else.
    - description - Description of the template and an instruction.
- Post new email to ```/email/emails/```.
  - Email model in backend needs atleast:
    - subject: charField (the subject of the email)
    - type: `emailType.id` **Is this a integer?** (identify the type of email, needed for listing of previews),
    - summary: charField (this is like "Infochefens hörna" can be shorter than news.),
    - text: charField (this is all the news, should be pretty long),
    - sendAt: dateTime,

## Potential committees usage

- Infomail to members.
- Announcements for meetings like "Höstmöte", "Vintermöte", "Vårmöte" or events.
- STABEN email to new students.
