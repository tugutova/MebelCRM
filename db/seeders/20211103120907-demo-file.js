module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Files', [
      {
        order_id: 1,
        link: 'dogovor_po_okazaniyu_uslug_pogruzochno_razgruzochnih_rabot_sborke_i_razborke_mebeli_perevozke.gif',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        order_id: 2,
        link: 'dogovor_po_okazaniyu_uslug_pogruzochno_razgruzochnih_rabot_sborke_i_razborke_mebeli_perevozke.gif',
        createdAt: new Date(),
        updatedAt: new Date(),

      },
      {
        order_id: 3,
        link: 'dogovor_po_okazaniyu_uslug_pogruzochno_razgruzochnih_rabot_sborke_i_razborke_mebeli_perevozke.gif',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        order_id: 4,
        link: 'dogovor_po_okazaniyu_uslug_pogruzochno_razgruzochnih_rabot_sborke_i_razborke_mebeli_perevozke.gif',
        createdAt: new Date(),
        updatedAt: new Date(),

      },
      {
        order_id: 5,
        link: 'dogovor_po_okazaniyu_uslug_pogruzochno_razgruzochnih_rabot_sborke_i_razborke_mebeli_perevozke.gif',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        order_id: 6,
        link: 'dogovor_po_okazaniyu_uslug_pogruzochno_razgruzochnih_rabot_sborke_i_razborke_mebeli_perevozke.gif',
        createdAt: new Date(),
        updatedAt: new Date(),

      },

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Files', null, {});
  },
};
