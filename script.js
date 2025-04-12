const adminPanel = document.getElementById("admin");
    const userPanel = document.getElementById("user");

    function showTab(role) {
      adminPanel.classList.add("hidden");
      userPanel.classList.add("hidden");
      document.getElementById(role).classList.remove("hidden");
    }

    const doctorList = document.getElementById("doctorList");
    const patientList = document.getElementById("patientList");
    const userDoctorList = document.getElementById("userDoctorList");
    const userSurgeryList = document.getElementById("userSurgeryList");

    const surgeries = JSON.parse(localStorage.getItem("surgeries")) || [];
    const doctors = JSON.parse(localStorage.getItem("doctors")) || [];
    const patients = JSON.parse(localStorage.getItem("patients")) || [];

    function addDoctor() {
      const name = document.getElementById("doctorName").value;
      const spec = document.getElementById("specialization").value;
      doctors.push(`${name} - ${spec}`);
      localStorage.setItem("doctors", JSON.stringify(doctors));
      renderDoctors();
    }

    function addPatient() {
      const name = document.getElementById("patientName").value;
      const issue = document.getElementById("patientIssue").value;
      patients.push(`${name} - ${issue}`);
      localStorage.setItem("patients", JSON.stringify(patients));
      renderPatients();
    }

    function renderDoctors() {
      doctorList.innerHTML = "";
      userDoctorList.innerHTML = "";
      doctors.forEach(doc => {
        doctorList.innerHTML += `<li>${doc}</li>`;
        userDoctorList.innerHTML += `<li>${doc}</li>`;
      });
    }

    function renderPatients() {
      patientList.innerHTML = "";
      patients.forEach(p => patientList.innerHTML += `<li>${p}</li>`);
    }

    const form = document.getElementById("surgeryForm");
    const tableBody = document.querySelector("#surgeryTable tbody");

    function renderSurgeries() {
      tableBody.innerHTML = "";
      userSurgeryList.innerHTML = "";
      surgeries.forEach((surgery, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${surgery.otId}</td>
          <td>${surgery.dateTime}</td>
          <td>${surgery.surgeryType}</td>
          <td>${surgery.anesthesia}</td>
          <td>${surgery.surgeon}</td>
          <td><button onclick="deleteSurgery(${index})">Delete</button></td>
        `;
        tableBody.appendChild(row);
        userSurgeryList.innerHTML += `<li>${surgery.dateTime} | ${surgery.surgeryType} | Surgeon: ${surgery.surgeon}</li>`;
      });
    }

    function deleteSurgery(index) {
      surgeries.splice(index, 1);
      localStorage.setItem("surgeries", JSON.stringify(surgeries));
      renderSurgeries();
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const newSurgery = {
        otId: form.otId.value,
        dateTime: form.dateTime.value,
        surgeryType: form.surgeryType.value,
        anesthesia: form.anesthesia.value,
        anesthesiologist: form.anesthesiologist.value,
        surgeon: form.surgeon.value,
        nurses: form.nurses.value,
        materials: form.materials.value,
        remarks: form.remarks.value
      };
      surgeries.push(newSurgery);
      localStorage.setItem("surgeries", JSON.stringify(surgeries));
      form.reset();
      renderSurgeries();
    });

    renderSurgeries();
    renderDoctors();
    renderPatients();