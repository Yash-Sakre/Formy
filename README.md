# Formy

Formy is a web application that empowers users to create customizable forms through an intuitive drag-and-drop interface. This tool simplifies form creation, customization, and management.

## Built With

- **Next.js 13** (AppRouter)
- **Dnd-kit** (Drag and drop functionality)
- **ServerActions**
- **TypeScript**
- **Tailwind CSS / Shadcn UI** (Styling)
- **Vercel PostgreSQL** (Database)
- **Prisma** (ORM)

## Features

- **Responsive Design**: Optimized for any device, ensuring a smooth experience across different screen sizes.
- **Drag-and-Drop Form Designer**: Create and arrange form fields with ease.
  - **Layout fields**: Title, Subtitle, Spacer, Separator, Paragraph.
  - **Form fields**: Text, Number, Select, Date, Checkbox, Textarea.
- **Customization**: Easily add and customize new form fields.
- **Form Preview**: Preview your form before sharing or submitting it.
- **Form Sharing**: Share a unique URL to give others access to your form.
- **Form Submissions and Validation**: Track form submissions with built-in validation.
- **Form Stats**: Monitor form visits and submissions for better insights.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Yash-Sakre/Formy.git
    ```

2. Navigate to the project directory:
    ```bash
    cd formy
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Set up environment variables:
    - Create a `.env` file in the root directory with your PostgreSQL and Vercel connection strings.

5. Run the development server:
    ```bash
    npm run dev
    ```

6. Open your browser to [http://localhost:3000](http://localhost:3000) to view the project.

## Usage

- Drag and drop fields to create forms.
- Customize fields and layout as per your requirements.
- Preview your form before sharing it.
- Share the form using a unique URL.
- Track submission data and view stats.


